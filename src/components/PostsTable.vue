<template>
  <div class="flex flex-col h-screen md:p-4 overflow-y-auto">
    <!-- Search Bar -->
    <div class="m-4 md:m-0 md:mb-4 md:w-1/3 relative">
      <label for="search" class="sr-only">Filter titles</label>
      <input
        id="search"
        v-model="searchQuery"
        type="text"
        placeholder="Filter titles..."
        class="w-full pl-10 p-2 border border-soft-gray dark:border-medium-gray rounded-md bg-off-white dark:bg-soft-black text-charcoal dark:text-soft-gray placeholder-charcoal dark:placeholder-soft-gray focus:outline-none focus:border-bright-blue dark:focus:border-bright-blue"
      />
      <MagnifyingGlassIcon class="absolute left-3 top-3 h-5 w-5 text-gray-400" />
    </div>

    <!-- Table Container -->
    <div
      ref="mobilePostsTableScroll"
      @scroll="handleScroll"
      class="flex-1 scrollbar-custom overflow-y-auto md:rounded-md"
    >
      <div v-if="isLoading">
        <!-- Skeleton Loader -->
        <div class="animate-pulse">
          <!-- Mobile Skeleton -->
          <div class="md:hidden">
            <div
              v-for="n in 15"
              :key="n"
              class="p-4 border-b border-soft-gray dark:border-medium-gray"
            >
              <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div class="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            </div>
          </div>

          <!-- Desktop Skeleton -->
          <div class="hidden md:block">
            <div class="h-10 bg-off-white dark:bg-soft-black"></div>
            <div
              v-for="n in 15"
              :key="n"
              class="flex items-center border-b border-soft-gray dark:border-medium-gray"
            >
              <div class="w-1/3 px-5 py-4">
                <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              </div>
              <div class="w-2/3 px-5 py-4">
                <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
      <template v-else>
        <!-- Mobile View -->
        <MobilePostsList
          class="md:hidden"
          :posts="scrolledPosts"
          :expandedPosts="expandedPosts"
          :searchQuery="searchQuery"
          @expandPost="expandPost"
          @openPostModal="openPostModal"
          :isLoadingMore="isLoadingMore"
        />

        <!-- Desktop View -->
        <DesktopPostsTable
          class="hidden md:block"
          :posts="paginatedPosts"
          :expandedPosts="expandedPosts"
          :searchQuery="searchQuery"
          @expandPost="expandPost"
          @openPostModal="openPostModal"
          @refreshData="fetchData"
        />
      </template>
    </div>

    <!-- Pagination Controls -->
    <PaginationControls
      class="hidden md:block"
      v-if="!isLoading && !error"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :startItem="startItem"
      :endItem="endItem"
      :totalItems="totalItems"
      @goToFirstPage="goToFirstPage"
      @prevPage="prevPage"
      @nextPage="nextPage"
      @goToLastPage="goToLastPage"
      @resetScroll="resetScroll"
    />

    <!-- Post Modal -->
    <PostModal v-if="showModal" :post="selectedPost" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import PostModal from './PostModal.vue';
import PaginationControls from './PaginationControls.vue';
import DesktopPostsTable from './DesktopPostsTable.vue';
import MobilePostsList from './MobilePostsList.vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';

const store = useStore();

const fetchData = (force = false) => {
  store.dispatch('posts/fetchPosts', force);
};

fetchData();

const posts = computed(() => store.getters['posts/allPosts']);
const isLoading = computed(() => store.getters['posts/isLoading']);
const error = computed(() => store.getters['ui/error']);

const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 15;
const expandedPosts = ref(new Set());
const showModal = ref(false);
const selectedPost = ref(null);
const isLoadingMore = ref(false);
const postsTableScroll = ref(null);
const mobilePostsTableScroll = ref(null);

const filteredPosts = computed(() => {
  return posts.value.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const totalPages = computed(() => Math.ceil(filteredPosts.value.length / itemsPerPage));
const totalItems = computed(() => filteredPosts.value.length);
const startItem = computed(() => (currentPage.value - 1) * itemsPerPage + 1);
const endItem = computed(() => Math.min(currentPage.value * itemsPerPage, totalItems.value));

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredPosts.value.slice(start, end);
});

const scrolledPosts = computed(() => {
  const end = currentPage.value * itemsPerPage;
  return filteredPosts.value.slice(0, end);
});

const handleScroll = () => {
  const scrollContainer = mobilePostsTableScroll.value;
  if (!scrollContainer || isLoadingMore.value) return;
  const threshold = 300;
  const position = scrollContainer.scrollTop + scrollContainer.clientHeight;
  const height = scrollContainer.scrollHeight;
  if (position > height - threshold) {
    loadMorePosts();
  }
};

/*
  A fake API call to simulate an async request. 
  Used to demonstrate proper infinite scrolling on mobile.
*/
const fakeApiCall = () => new Promise((resolve) => setTimeout(resolve, 1000));

const loadMorePosts = async () => {
  if (currentPage.value < totalPages.value && !isLoadingMore.value) {
    isLoadingMore.value = true;
    await fakeApiCall();
    currentPage.value += 1;
    isLoadingMore.value = false;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
    expandedPosts.value.clear();
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    expandedPosts.value.clear();
  }
};

const goToFirstPage = () => {
  if (currentPage.value > 1) {
    currentPage.value = 1;
    expandedPosts.value.clear();
  }
};

const goToLastPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value = totalPages.value;
    expandedPosts.value.clear();
  }
};

const resetScroll = () => {
  if (postsTableScroll.value) postsTableScroll.value.scrollTop = 0;
  if (mobilePostsTableScroll.value) mobilePostsTableScroll.value.scrollTop = 0;
};

const expandPost = (postId) => {
  expandedPosts.value.add(postId);
};

const openPostModal = (post) => {
  selectedPost.value = post;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedPost.value = null;
};

watch(posts, () => {
  currentPage.value = 1;
  expandedPosts.value.clear();
});

watch(searchQuery, () => {
  currentPage.value = 1;
  expandedPosts.value.clear();
  resetScroll();
});
</script>
