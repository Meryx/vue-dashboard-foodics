<template>
  <MainLayout>
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

      <!-- Main Content Area -->
      <PostsTable
        :currentPage="currentPage"
        :totalPages="totalPages"
        :searchQuery="searchQuery"
        :expandedPosts="expandedPosts"
        :trigger="scrollTrigger"
        @nextPage="nextPage"
        @prevPage="prevPage"
        @expandPost="expandPost"
        @openPostModal="openPostModal"
        @nextBatch="nextBatch"
        @clearExpandedPosts="clearExpandedPosts"
      />

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
  </MainLayout>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import MainLayout from '@/layouts/MainLayout.vue';
import PostModal from '@/components/PostModal.vue';
import PaginationControls from '@/components/PaginationControls.vue';
import PostsTable from '@/components/PostsTable.vue';
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
const scrollTrigger = ref(false);

const filteredPosts = computed(() => {
  return posts.value.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const totalPages = computed(() => Math.ceil(filteredPosts.value.length / itemsPerPage));
const totalItems = computed(() => filteredPosts.value.length);
const startItem = computed(() => (currentPage.value - 1) * itemsPerPage + 1);
const endItem = computed(() => Math.min(currentPage.value * itemsPerPage, totalItems.value));

const nextBatch = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
    clearExpandedPosts();
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    clearExpandedPosts();
  }
};

const goToFirstPage = () => {
  if (currentPage.value > 1) {
    currentPage.value = 1;
    clearExpandedPosts();
  }
};

const goToLastPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value = totalPages.value;
    clearExpandedPosts();
  }
};

const clearExpandedPosts = () => {
  expandedPosts.value.clear();
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

const resetScroll = () => {
  scrollTrigger.value = !scrollTrigger.value;
};

watch(posts, () => {
  goToFirstPage();
});

watch(searchQuery, () => {
  goToFirstPage();
  resetScroll();
});
</script>
