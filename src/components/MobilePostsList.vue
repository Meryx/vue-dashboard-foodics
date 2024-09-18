<template>
  <div>
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
      <h2
        class="text-lg font-semibold text-charcoal dark:text-soft-gray"
        v-html="highlightMatch(post.title, searchQuery)"
      ></h2>
      <div class="mt-2 flex items-center">
        <p class="text-charcoal dark:text-soft-gray flex-grow">
          {{ expandedPosts.has(post.id) ? post.body : truncateText(post.body, 100) }}
        </p>
        <button
          v-if="!expandedPosts.has(post.id)"
          @click.stop="expandPost(post.id)"
          :class="['ml-2', 'whitespace-nowrap', buttonClasses]"
        >
          Read more
        </button>
      </div>
    </div>
    <div v-if="isLoadingMore" class="flex justify-center my-4">
      <ArrowPathIcon class="h-6 w-6 animate-spin text-bright-blue" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { ArrowPathIcon } from '@heroicons/vue/24/solid';

defineProps({
  posts: Array,
  expandedPosts: Object,
  searchQuery: String,
  isLoadingMore: Boolean,
});

const emit = defineEmits(['expandPost', 'openPostModal']);

const expandPost = (postId) => {
  emit('expandPost', postId);
};

const openPostModal = (post) => {
  emit('openPostModal', post);
};

const truncateText = (text, length) =>
  text.length > length ? `${text.slice(0, length)}...` : text;

const highlightMatch = (text, search) => {
  if (!search) return text;
  const searchRegex = new RegExp(`(${search})`, 'gi');
  return text.replace(searchRegex, '<strong class="font-bold">$1</strong>');
};

const buttonClasses = [
  'text-bright-blue hover:underline focus:outline-none dark:text-bright-blue dark:hover:underline',
];
</script>
