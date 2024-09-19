<template>
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
        :isLoadingMore="isLoadingMore"
        @expandPost="expandPost"
        @openPostModal="openPostModal"
      />

      <!-- Desktop View -->
      <DesktopPostsTable
        class="hidden md:block"
        ref="desktopPostsTable"
        :posts="paginatedPosts"
        :expandedPosts="expandedPosts"
        :searchQuery="searchQuery"
        @refreshData="refreshData"
        @expandPost="expandPost"
        @openPostModal="openPostModal"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import DesktopPostsTable from './DesktopPostsTable.vue';
import MobilePostsList from './MobilePostsList.vue';

const store = useStore();

const fetchData = (force = false) => {
  store.dispatch('posts/fetchPosts', force);
};

fetchData();

const posts = computed(() => store.getters['posts/allPosts']);
const isLoading = computed(() => store.getters['posts/isLoading']);
const error = computed(() => store.getters['ui/error']);

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
  searchQuery: String,
  expandedPosts: Set,
  trigger: Boolean,
});

const isLoadingMore = ref(false);
const itemsPerPage = 15;
const mobilePostsTableScroll = ref(null);
const desktopPostsTable = ref(null);

const paginatedPosts = computed(() => {
  const start = (props.currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredPosts.value.slice(start, end);
});

const scrolledPosts = computed(() => {
  const end = props.currentPage * itemsPerPage;
  return filteredPosts.value.slice(0, end);
});

const filteredPosts = computed(() => {
  return posts.value.filter((post) =>
    post.title.toLowerCase().includes(props.searchQuery.toLowerCase())
  );
});

const expandPost = (postId) => {
  emit('expandPost', postId);
};

/*
  A fake API call to simulate an async request.
  Used to demonstrate proper infinite scrolling on mobile.
*/
const fakeApiCall = () => new Promise((resolve) => setTimeout(resolve, 1000));

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

const emit = defineEmits([
  'nextPage',
  'goToFirstPage',
  'expandPost',
  'clearExpandedPosts',
  'openPostModal',
  'nextBatch',
]);

const refreshData = () => {
  emit('clearExpandedPosts');
  fetchData(true);
};

const loadMorePosts = async () => {
  if (props.currentPage < props.totalPages && !isLoadingMore.value) {
    isLoadingMore.value = true;
    await fakeApiCall();
    emit('nextBatch');
    isLoadingMore.value = false;
  }
};

const resetScroll = () => {
  desktopPostsTable.value.resetScroll();
  if (mobilePostsTableScroll.value) mobilePostsTableScroll.value.scrollTop = 0;
};

const openPostModal = (post) => {
  emit('openPostModal', post);
};

watch(posts, () => {
  emit('goToFirstPage');
});

watch(
  () => props.trigger,
  () => {
    resetScroll();
  }
);

watch(
  () => props.searchQuery,
  () => {
    emit('goToFirstPage');
    resetScroll();
  }
);
</script>
