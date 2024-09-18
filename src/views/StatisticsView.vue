<template>
  <MainLayout>
    <div class="flex flex-col h-screen overflow-auto bg-site-lite dark:bg-site-dark">
      <div v-if="isLoading" class="p-4 flex flex-col md:flex-row items-start gap-4">
        <div
          class="bg-alternate-light dark:bg-soft-black shadow rounded p-6 md:h-80 w-full md:w-1/2 flex flex-col gap-4"
        >
          <div class="flex flex-col items-start">
            <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2 w-32"></div>
            <div class="h-10 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-24"></div>
          </div>
          <div class="flex flex-col items-start">
            <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2 w-32"></div>
            <div class="h-10 bg-gray-300 dark:bg-gray-700 rounded animate-pulse w-24"></div>
          </div>
        </div>
        <div
          class="bg-alternate-light dark:bg-soft-black shadow rounded p-4 flex-1 w-full md:w-1/2 h-80"
        >
          <div class="flex justify-center items-center h-full">
            <ArrowPathIcon class="h-16 w-16 animate-spin text-bright-blue" />
          </div>
        </div>
      </div>

      <div v-else-if="error" class="p-4 text-red-500 text-center">
        {{ error }}
      </div>

      <div v-else>
        <div class="p-4 flex flex-col md:flex-row items-start gap-4">
          <div
            class="bg-alternate-light dark:bg-soft-black shadow rounded p-6 md:h-80 w-full md:w-1/2 flex flex-col gap-4"
          >
            <div class="flex flex-col items-start">
              <h3 class="text-lg font-semibold mb-2 text-charcoal dark:text-soft-gray">
                Total Posts
              </h3>
              <p class="text-charcoal dark:text-soft-gray text-4xl font-bold">
                {{ totalPosts }}
              </p>
            </div>
            <div class="flex flex-col items-start">
              <h3 class="text-lg font-semibold mb-2 text-charcoal dark:text-soft-gray">
                Total Comments
              </h3>
              <p class="text-charcoal dark:text-soft-gray text-4xl font-bold">
                {{ totalComments }}
              </p>
            </div>
          </div>
          <div
            class="bg-alternate-light dark:bg-soft-black shadow rounded p-4 flex-1 w-full md:w-1/2 h-80"
          >
            <div class="h-72">
              <CommentsChart />
            </div>
          </div>
        </div>

        <div class="p-4 flex-1">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div class="bg-alternate-light dark:bg-soft-black shadow rounded p-4">
              <h3 class="text-xl font-semibold mb-2 text-charcoal dark:text-soft-gray">
                Longest Post
              </h3>
              <p class="text-charcoal dark:text-soft-gray">
                {{ longestPost.title }}
              </p>
              <p class="mt-2 text-charcoal dark:text-soft-gray">
                {{ longestPostLength }} characters
              </p>
            </div>
            <div class="bg-alternate-light dark:bg-soft-black shadow rounded p-4">
              <h3 class="text-xl font-semibold mb-2 text-charcoal dark:text-soft-gray">
                Shortest Post
              </h3>
              <p class="text-charcoal dark:text-soft-gray">
                {{ shortestPost.title }}
              </p>
              <p class="mt-2 text-charcoal dark:text-soft-gray">
                {{ shortestPostLength }} characters
              </p>
            </div>
            <div class="bg-alternate-light dark:bg-soft-black shadow rounded p-4">
              <h3 class="text-xl font-semibold mb-2 text-charcoal dark:text-soft-gray">
                Average Length
              </h3>
              <p class="text-charcoal dark:text-soft-gray">{{ insights.average }} characters</p>
            </div>
            <div class="bg-alternate-light dark:bg-soft-black shadow rounded p-4">
              <h3 class="text-xl font-semibold mb-2 text-charcoal dark:text-soft-gray">
                Median Length
              </h3>
              <p class="text-charcoal dark:text-soft-gray">{{ insights.median }} characters</p>
            </div>
            <div class="bg-alternate-light dark:bg-soft-black shadow rounded p-4">
              <h3 class="text-xl font-semibold mb-2 text-charcoal dark:text-soft-gray">
                Minimum Length
              </h3>
              <p class="text-charcoal dark:text-soft-gray">{{ insights.min }} characters</p>
            </div>
            <div class="bg-alternate-light dark:bg-soft-black shadow rounded p-4">
              <h3 class="text-xl font-semibold mb-2 text-charcoal dark:text-soft-gray">
                Maximum Length
              </h3>
              <p class="text-charcoal dark:text-soft-gray">{{ insights.max }} characters</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { computed } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
import CommentsChart from '@/components/CommentsChart.vue';
import { useStore } from 'vuex';
import { ArrowPathIcon } from '@heroicons/vue/24/solid';

const store = useStore();

store.dispatch('posts/fetchPosts');
store.dispatch('comments/fetchAllComments');

const posts = computed(() => store.getters['posts/allPosts']);
const isLoadingPosts = computed(() => store.getters['posts/isLoadingPosts']);

const comments = computed(() => store.getters['comments/allComments']);
const isLoadingComments = computed(() => store.getters['comments/isLoadingAllComments']);

const error = computed(() => store.getters['ui/error']);

const postLengths = computed(() => posts.value.map((post) => post.body.length));

const calculateInsights = (lengths) => {
  const sortedLengths = [...lengths].sort((a, b) => a - b);
  const total = lengths.reduce((sum, len) => sum + len, 0);
  const min = sortedLengths[0];
  const max = sortedLengths[sortedLengths.length - 1];
  const average = total / lengths.length;
  const median =
    lengths.length % 2 === 0
      ? (sortedLengths[lengths.length / 2 - 1] + sortedLengths[lengths.length / 2]) / 2
      : sortedLengths[Math.floor(lengths.length / 2)];
  return { min, max, average, median, totalPosts: lengths.length };
};

const insights = computed(() => calculateInsights(postLengths.value));

const isLoading = computed(() => isLoadingPosts.value || isLoadingComments.value);

const longestPost = computed(() => {
  if (posts.value.length === 0) return null;
  const maxLength = Math.max(...postLengths.value);
  return posts.value.find((post) => post.body.length === maxLength);
});

const shortestPost = computed(() => {
  if (posts.value.length === 0) return null;
  const minLength = Math.min(...postLengths.value);
  return posts.value.find((post) => post.body.length === minLength);
});

const longestPostLength = computed(() => longestPost.value?.body.length || 0);
const shortestPostLength = computed(() => shortestPost.value?.body.length || 0);

const totalPosts = computed(() => posts.value.length);
const totalComments = computed(() => comments.value.length);
</script>
