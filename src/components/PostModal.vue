<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <!-- Background Overlay -->
    <div class="absolute inset-0 bg-black opacity-50" @click="close"></div>

    <!-- Modal Content -->
    <div
      class="md:rounded-md shadow-lg p-6 z-20 h-[75vh] w-[90vw] mx-auto bg-white dark:bg-soft-black text-charcoal dark:text-soft-gray overflow-auto max-h-screen md:max-h-[90vh] scrollbar-custom"
    >
      <!-- Loading State -->
      <div v-if="isLoading" class="space-y-4 animate-pulse">
        <!-- Post Skeleton -->
        <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-4"></div>

        <!-- User Information Skeleton -->
        <div class="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-4"></div>

        <!-- Comments Skeleton -->
        <div class="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
        <div class="space-y-2">
          <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-red-500 text-center">
        An error occurred while fetching the post details. Please try again later.
      </div>

      <!-- Content -->
      <div v-else>
        <!-- Post Section -->
        <div class="mb-6">
          <h2 class="text-2xl font-bold mb-2">{{ post.title }}</h2>
          <p class="text-sm mb-4">
            By <strong>{{ user.name + ' ' }}</strong>
            <a :href="'mailto:' + user.email" class="text-bright-blue hover:underline">
              {{ user.email }}
            </a>
          </p>
          <p class="mb-4">{{ post.body }}</p>
        </div>

        <!-- Comments Section -->
        <div v-if="comments.length" class="mb-6">
          <h3 class="text-xl font-semibold mb-4">Comments ({{ comments.length }})</h3>
          <ul class="space-y-4">
            <li
              v-for="comment in comments"
              :key="comment.id"
              class="p-4 bg-off-white dark:bg-alternate-dark rounded shadow"
            >
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">{{ comment.name }}</span>
                <a
                  :href="'mailto:' + comment.email"
                  class="text-sm text-bright-blue hover:underline"
                >
                  {{ comment.email }}
                </a>
              </div>
              <p>{{ comment.body }}</p>
            </li>
          </ul>
        </div>

        <!-- Close Button -->
        <div class="flex justify-end">
          <button
            @click="close"
            class="mt-4 px-6 py-2 rounded bg-bright-blue text-white hover:bg-blue-600 focus:outline-none transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close']);

const store = useStore();
const { id: postId, userId } = props.post;

const close = () => {
  emit('close');
};

store.dispatch('users/fetchUser', userId);
store.dispatch('comments/fetchComments', postId);

const user = computed(() => store.getters['users/getUserById'](userId));
const comments = computed(() => store.getters['comments/getCommentsByPostId'](postId));
const isLoading = computed(
  () => store.getters['users/isLoading'] || store.getters['comments/isLoadingComments'](postId)
);
const error = computed(() => store.getters['ui/error']);
</script>
