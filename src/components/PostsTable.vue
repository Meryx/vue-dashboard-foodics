<template>
  <div class="h-full scrollbar-custom overflow-y-auto overflow-hidden rounded-md">
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
      <div class="md:hidden">
        <div
          v-for="(post, index) in paginatedPosts"
          :key="post.id"
          @click="openPostModal(post)"
          :class="[
            'p-4 border-b border-soft-gray dark:border-medium-gray cursor-pointer',
            index % 2 === 0
              ? 'bg-off-white dark:bg-soft-black'
              : 'bg-alternate-light dark:bg-alternate-dark',
          ]"
        >
          <h2 class="text-lg font-semibold text-charcoal dark:text-soft-gray">
            {{ post.title }}
          </h2>
          <div class="mt-2 flex items-center">
            <p class="text-charcoal dark:text-soft-gray flex-grow">
              {{ expandedPosts.has(post.id) ? post.body : truncateText(post.body, 100) }}
            </p>
            <button
              v-if="!expandedPosts.has(post.id)"
              @click.stop="expandPost(post.id)"
              :class="buttonClasses"
              class="ml-2 whitespace-nowrap"
            >
              Read more
            </button>
          </div>
        </div>
      </div>

      <!-- Desktop View -->
      <table
        class="min-w-full leading-normal border-separate hidden md:table table-fixed w-full"
        style="border-spacing: 0"
      >
        <thead class="sticky top-0 bg-off-white dark:bg-soft-black">
          <tr>
            <th
              class="w-1/3 px-5 py-3 border-b-2 border-soft-gray dark:border-medium-gray text-left text-sm font-semibold uppercase tracking-wider text-charcoal dark:text-soft-gray"
            >
              Title
            </th>
            <th
              class="w-2/3 px-5 py-3 border-b-2 border-soft-gray dark:border-medium-gray text-left text-sm font-semibold uppercase tracking-wider text-charcoal dark:text-soft-gray"
            >
              Body
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(post, index) in paginatedPosts"
            :key="post.id"
            :class="[
              'border-b border-soft-gray dark:border-medium-gray',
              index % 2 === 0
                ? 'bg-alternate-light dark:bg-alternate-dark'
                : 'bg-off-white dark:bg-soft-black',
            ]"
          >
            <td :class="['px-5 py-3', index === paginatedPosts.length - 1 ? 'rounded-bl-md' : '']">
              <div class="w-full overflow-hidden">
                <a
                  href="#"
                  @click.prevent="openPostModal(post)"
                  :class="[
                    'hover:underline text-charcoal dark:text-soft-gray hover:text-bright-blue dark:hover:text-bright-blue block',
                    !expandedPosts.has(post.id) ? 'truncate' : 'whitespace-normal break-words',
                  ]"
                >
                  {{ post.title }}
                </a>
              </div>
            </td>
            <td :class="['px-5 py-3', index === paginatedPosts.length - 1 ? 'rounded-br-md' : '']">
              <div class="w-full overflow-hidden">
                <div class="flex items-start">
                  <span
                    class="flex-grow mr-2"
                    :class="[
                      !expandedPosts.has(post.id) ? 'truncate' : 'whitespace-normal break-words',
                    ]"
                  >
                    {{ post.body }}
                  </span>
                  <button
                    v-if="!expandedPosts.has(post.id)"
                    @click.stop="expandPost(post.id)"
                    :class="buttonClasses"
                    class="whitespace-nowrap"
                  >
                    Read more
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination Controls -->
      <div class="flex justify-between items-center mt-4 px-4">
        <!-- Bottom Left: Showing x–y of z posts -->
        <div class="text-charcoal dark:text-soft-gray">
          {{ startItem }}–{{ endItem }} of {{ totalItems }}
        </div>
        <!-- Bottom Right: Pagination Buttons -->
        <div class="flex flex-col">
          <div class="flex items-center space-x-2">
            <!-- First Page Button -->
            <button
              @click="goToFirstPage"
              :disabled="currentPage === 1"
              class="px-2 py-1 bg-light-gray dark:bg-dark-gray text-charcoal dark:text-soft-gray rounded-md hover:bg-soft-gray dark:hover:bg-medium-gray disabled:opacity-50"
            >
              «
            </button>
            <!-- Previous Page Button -->
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="px-2 py-1 bg-light-gray dark:bg-dark-gray text-charcoal dark:text-soft-gray rounded-md hover:bg-soft-gray dark:hover:bg-medium-gray disabled:opacity-50"
            >
              ‹
            </button>
            <!-- Next Page Button -->
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="px-2 py-1 bg-light-gray dark:bg-dark-gray text-charcoal dark:text-soft-gray rounded-md hover:bg-soft-gray dark:hover:bg-medium-gray disabled:opacity-50"
            >
              ›
            </button>
            <!-- Last Page Button -->
            <button
              @click="goToLastPage"
              :disabled="currentPage === totalPages"
              class="px-2 py-1 bg-light-gray dark:bg-dark-gray text-charcoal dark:text-soft-gray rounded-md hover:bg-soft-gray dark:hover:bg-medium-gray disabled:opacity-50"
            >
              »
            </button>
          </div>
          <!-- Page Indicator -->
          <div class="text-charcoal dark:text-soft-gray py-2">
            Page {{ currentPage }} of {{ totalPages }}
          </div>
        </div>
      </div>
    </template>

    <PostModal v-if="showModal" :post="selectedPost" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { usePosts } from '../composables/usePosts';
import PostModal from './PostModal.vue';

const { posts, isLoading, error } = usePosts();

const expandedPosts = ref(new Set());
const showModal = ref(false);
const selectedPost = ref(null);

const currentPage = ref(1);
const itemsPerPage = 15;

const totalPages = computed(() => Math.ceil(posts.value.length / itemsPerPage));
const totalItems = computed(() => posts.value.length);
const startItem = computed(() => (currentPage.value - 1) * itemsPerPage + 1);
const endItem = computed(() => Math.min(currentPage.value * itemsPerPage, totalItems.value));

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return posts.value.slice(start, end);
});

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
    expandedPosts.value.clear();
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    expandedPosts.value.clear();
  }
}

function goToFirstPage() {
  if (currentPage.value > 1) {
    currentPage.value = 1;
    expandedPosts.value.clear();
  }
}

function goToLastPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value = totalPages.value;
    expandedPosts.value.clear();
  }
}

function expandPost(postId) {
  expandedPosts.value.add(postId);
}

function truncateText(text, length) {
  return text.length > length ? text.slice(0, length) + '...' : text;
}

function openPostModal(post) {
  selectedPost.value = post;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  selectedPost.value = null;
}

// Reset to page 1 when posts change
watch(posts, () => {
  currentPage.value = 1;
  expandedPosts.value.clear();
});

const buttonClasses = [
  'text-bright-blue hover:underline focus:outline-none dark:text-bright-blue dark:hover:underline',
];
</script>
