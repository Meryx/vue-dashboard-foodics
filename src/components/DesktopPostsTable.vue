<template>
  <div ref="postsTableScroll" class="scrollbar-custom max-h-full overflow-y-auto">
    <table
      class="min-w-full leading-normal table-fixed w-full border-separate"
      style="border-spacing: 0"
    >
      <thead class="sticky top-0 bg-off-white dark:bg-soft-black">
        <tr>
          <th
            class="w-1/3 px-5 py-3 border-b-2 border-soft-gray dark:border-medium-gray text-left text-sm font-semibold uppercase tracking-wider text-charcoal dark:text-soft-gray"
          >
            <strong>Title</strong>
          </th>
          <th
            class="px-5 py-3 border-b-2 border-soft-gray dark:border-medium-gray text-left text-sm font-semibold uppercase tracking-wider text-charcoal dark:text-soft-gray flex justify-between items-center"
          >
            <strong>Body</strong>
            <button
              @click="refreshData(true)"
              class="px-2 py-1 bg-light-gray dark:bg-dark-gray text-charcoal dark:text-soft-gray rounded-md hover:bg-soft-gray dark:hover:bg-medium-gray disabled:opacity-50"
            >
              <ArrowPathIcon class="h-6 w-6" />
            </button>
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
          <td :class="['px-5 py-3', index === posts.length - 1 ? 'rounded-bl-md' : '']">
            <div class="w-full overflow-hidden">
              <a
                href="#"
                @click.prevent="openPostModal(post)"
                :class="[
                  'hover:underline text-charcoal dark:text-soft-gray hover:text-bright-blue dark:hover:text-bright-blue block',
                ]"
                v-html="highlightMatch(post.title, searchQuery)"
              >
              </a>
            </div>
          </td>
          <td :class="['px-5 py-3', index === posts.length - 1 ? 'rounded-br-md' : '']">
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
                  :class="['whitespace-nowrap', buttonClasses]"
                >
                  Read more
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { ArrowPathIcon } from '@heroicons/vue/24/solid';

defineProps({
  posts: Array,
  expandedPosts: Object,
  searchQuery: String,
});

const emit = defineEmits(['expandPost', 'openPostModal', 'refreshData']);

const expandPost = (postId) => {
  emit('expandPost', postId);
};

const openPostModal = (post) => {
  emit('openPostModal', post);
};

const refreshData = (force) => {
  emit('refreshData', force);
};

const highlightMatch = (text, search) => {
  if (!search) return text;
  const searchRegex = new RegExp(`(${search})`, 'gi');
  return text.replace(searchRegex, '<strong class="font-bold">$1</strong>');
};

const buttonClasses = [
  'text-bright-blue hover:underline focus:outline-none dark:text-bright-blue dark:hover:underline',
];
</script>
