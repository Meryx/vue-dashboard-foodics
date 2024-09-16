<template>
  <div>
    <div v-if="isLoading" class="text-center">Loading posts...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <table class="min-w-full leading-normal">
      <thead>
        <tr>
          <th
            class="px-5 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider bg-off-white dark:bg-soft-black text-charcoal dark:text-soft-gray border-soft-gray dark:border-medium-gray"
          >
            Title
          </th>
          <th
            class="px-5 py-3 border-b-2 text-left text-sm font-semibold uppercase tracking-wider bg-off-white dark:bg-soft-black text-charcoal dark:text-soft-gray border-soft-gray dark:border-medium-gray"
          >
            Body
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="post in posts"
          :key="post.id"
          class="border-b bg-off-white dark:bg-soft-black border-soft-gray dark:border-medium-gray"
        >
          <td class="px-5 py-5">
            <a
              href="#"
              @click.prevent="openPostModal(post)"
              class="hover:underline text-charcoal dark:text-soft-gray hover:text-bright-blue dark:hover:text-bright-blue"
            >
              {{ post.title }}
            </a>
          </td>
          <td class="px-5 py-5">
            <div>
              <span v-if="expandedPosts.has(post.id)">
                {{ post.body }}
                <button @click="toggleReadMore(post.id)" :class="buttonClasses">Read less</button>
              </span>
              <span v-else>
                {{ truncateText(post.body, 100) }}
                <button @click="toggleReadMore(post.id)" :class="buttonClasses">Read more</button>
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

function toggleReadMore(postId) {
  if (expandedPosts.value.has(postId)) {
    expandedPosts.value.delete(postId);
  } else {
    expandedPosts.value.add(postId);
  }
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

const buttonClasses = [
  'ml-2 text-bright-blue hover:underline focus:outline-none dark:text-bright-blue dark:hover:underline',
];
</script>
