<template>
  <div class="overflow-y-auto h-full scrollbar-custom">
    <div v-if="isLoading" class="text-center">Loading posts...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <table class="min-w-full leading-normal border-separate" style="border-spacing: 0">
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
          v-for="(post, index) in posts"
          :key="post.id"
          :class="[
            'border-b border-soft-gray dark:border-medium-gray',
            index % 2 === 0
              ? 'bg-alternate-light dark:bg-alternate-dark'
              : 'bg-off-white dark:bg-soft-black',
          ]"
        >
          <td class="w-1/3 px-5 py-5">
            <a
              href="#"
              @click.prevent="openPostModal(post)"
              class="hover:underline text-charcoal dark:text-soft-gray hover:text-bright-blue dark:hover:text-bright-blue"
            >
              {{ post.title }}
            </a>
          </td>
          <td class="w-2/3 px-5 py-5">
            <div class="flex items-start">
              <span class="flex-grow">
                {{ expandedPosts.has(post.id) ? post.body : truncateText(post.body, 100) }}
              </span>
              <button
                v-if="!expandedPosts.has(post.id)"
                @click="expandPost(post.id)"
                :class="buttonClasses"
              >
                Read more
              </button>
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

const buttonClasses = [
  'ml-2 text-bright-blue hover:underline focus:outline-none dark:text-bright-blue dark:hover:underline',
];
</script>
