<template>
  <div>
    <div v-if="isLoading" class="text-center">Loading posts...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <table class="min-w-full leading-normal">
      <thead>
        <tr>
          <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
          >
            Title
          </th>
          <th
            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
          >
            Body
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="post in posts"
          :key="post.id"
          class="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        >
          <td class="px-5 py-5 border-b">
            <a
              href="#"
              @click.prevent="openPostModal(post)"
              class="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200 hover:underline"
            >
              {{ post.title }}
            </a>
          </td>
          <td class="px-5 py-5 border-b">
            <div>
              <span v-if="expandedPosts.has(post.id)">
                {{ post.body }}
                <button @click="toggleReadMore(post.id)">Read less</button>
              </span>
              <span v-else>
                {{ truncateText(post.body, 100) }}
                <button @click="toggleReadMore(post.id)">Read more</button>
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <PostModal v-if="showModal" :post="selectedPost" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePosts } from '../composables/usePosts';
import PostModal from './PostModal.vue';

const { posts, isLoading, error } = usePosts();

const expandedPosts = ref(new Set());
const showModal = ref(false);
const selectedPost = ref(null);

const toggleReadMore = (postId) => {
  if (expandedPosts.value.has(postId)) {
    expandedPosts.value.delete(postId);
  } else {
    expandedPosts.value.add(postId);
  }
};

const truncateText = (text, length) => {
  return text.length > length ? text.slice(0, length) + '...' : text;
};

const openPostModal = (post) => {
  selectedPost.value = post;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedPost.value = null;
};
</script>
