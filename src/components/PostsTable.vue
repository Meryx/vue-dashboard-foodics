<template>
  <div class="overflow-y-auto h-full scrollbar-custom">
    <div v-if="isLoading">
      <div class="animate-pulse">
        <div class="md:hidden">
          <div
            v-for="n in 5"
            :key="n"
            class="p-4 border-b border-soft-gray dark:border-medium-gray"
          >
            <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div class="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          </div>
        </div>

        <div class="hidden md:block">
          <div class="h-10 bg-off-white dark:bg-soft-black"></div>
          <div
            v-for="n in 5"
            :key="n"
            class="flex items-center border-b border-soft-gray dark:border-medium-gray"
          >
            <div class="w-1/3 px-5 py-4">
              <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
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
      <div class="md:hidden">
        <div
          v-for="(post, index) in posts"
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

      <table
        class="min-w-full leading-normal border-separate hidden md:table"
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
              <div class="flex items-center">
                <span class="flex-grow mr-2">
                  {{ expandedPosts.has(post.id) ? post.body : truncateText(post.body, 100) }}
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
            </td>
          </tr>
        </tbody>
      </table>
    </template>

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
  'text-bright-blue hover:underline focus:outline-none dark:text-bright-blue dark:hover:underline',
];
</script>
