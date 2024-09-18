<template>
  <MainLayout>
    <div
      class="statistics-page flex flex-col h-screen overflow-auto bg-site-lite dark:bg-site-dark"
    >
      <!-- Chart and Total Pane Section -->
      <div class="p-4 flex flex-col md:flex-row items-start gap-4">
        <!-- Total Pane -->
        <div
          class="bg-alternate-light dark:bg-soft-black shadow rounded p-6 md:h-80 w-full md:w-1/2 flex flex-col gap-4"
        >
          <!-- Total Posts Card -->
          <div class="flex flex-col items-start">
            <h3 class="text-lg font-semibold mb-2 text-charcoal dark:text-soft-gray">
              Total Posts
            </h3>
            <p v-if="!isLoading" class="text-charcoal dark:text-soft-gray text-4xl font-bold">
              {{ totalPosts }}
            </p>
            <div v-else class="w-full">
              <div class="h-10 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>

          <!-- Total Comments Card -->
          <div class="flex flex-col items-start">
            <h3 class="text-lg font-semibold mb-2 text-charcoal dark:text-soft-gray">
              Total Comments
            </h3>
            <p v-if="!isLoading" class="text-charcoal dark:text-soft-gray text-4xl font-bold">
              {{ totalComments }}
            </p>
            <div v-else class="w-full">
              <div class="h-10 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        <!-- Chart Container -->
        <div
          class="bg-alternate-light dark:bg-soft-black shadow rounded p-4 flex-1 w-full md:w-1/2 h-80"
        >
          <div v-if="!isLoading" class="h-72">
            <CommentsChart />
          </div>
          <div v-else class="flex justify-center items-center h-80">
            <ArrowPathIcon class="h-16 w-16 animate-spin text-bright-blue" />
          </div>
        </div>
      </div>

      <!-- Numerical Insights Section -->
      <div class="p-4 flex-1">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <!-- Longest Post Card -->
          <div class="bg-alternate-light dark:bg-soft-black shadow rounded p-4">
            <h3 class="text-xl font-semibold mb-2 text-charcoal dark:text-soft-gray">
              Longest Post
            </h3>
            <p v-if="!isLoading && longestPost" class="text-charcoal dark:text-soft-gray">
              {{ longestPost.title }}
            </p>
            <div v-else class="w-full">
              <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
            </div>
            <p v-if="!isLoading" class="mt-2 text-charcoal dark:text-soft-gray">
              {{ longestPostLength }} characters
            </p>
            <div
              v-else
              class="w-1/2 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mt-2"
            ></div>
          </div>

          <!-- Shortest Post Card -->
          <div class="bg-alternate-light dark:bg-soft-black shadow rounded p-4">
            <h3 class="text-xl font-semibold mb-2 text-charcoal dark:text-soft-gray">
              Shortest Post
            </h3>
            <p v-if="!isLoading && shortestPost" class="text-charcoal dark:text-soft-gray">
              {{ shortestPost.title }}
            </p>
            <div v-else class="w-full">
              <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
            </div>
            <p v-if="!isLoading" class="mt-2 text-charcoal dark:text-soft-gray">
              {{ shortestPostLength }} characters
            </p>
            <div
              v-else
              class="w-1/2 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mt-2"
            ></div>
          </div>

          <!-- Average Length Card -->
          <div class="bg-alternate-light dark:bg-soft-black shadow rounded p-4">
            <h3 class="text-xl font-semibold mb-2 text-charcoal dark:text-soft-gray">
              Average Length
            </h3>
            <p v-if="!isLoading" class="text-charcoal dark:text-soft-gray">
              {{ insights.average }} characters
            </p>
            <div v-else class="w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>

          <!-- Median Length Card -->
          <div class="bg-alternate-light dark:bg-soft-black shadow rounded p-4">
            <h3 class="text-xl font-semibold mb-2 text-charcoal dark:text-soft-gray">
              Median Length
            </h3>
            <p v-if="!isLoading" class="text-charcoal dark:text-soft-gray">
              {{ insights.median }} characters
            </p>
            <div v-else class="w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>

          <!-- Minimum Length Card -->
          <div class="bg-alternate-light dark:bg-soft-black shadow rounded p-4">
            <h3 class="text-xl font-semibold mb-2 text-charcoal dark:text-soft-gray">
              Minimum Length
            </h3>
            <p v-if="!isLoading" class="text-charcoal dark:text-soft-gray">
              {{ insights.min }} characters
            </p>
            <div v-else class="w-1/2 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>

          <!-- Maximum Length Card -->
          <div class="bg-alternate-light dark:bg-soft-black shadow rounded p-4">
            <h3 class="text-xl font-semibold mb-2 text-charcoal dark:text-soft-gray">
              Maximum Length
            </h3>
            <p v-if="!isLoading" class="text-charcoal dark:text-soft-gray">
              {{ insights.max }} characters
            </p>
            <div v-else class="w-1/2 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { computed } from 'vue';
import MainLayout from '../layouts/MainLayout.vue';
import CommentsChart from '../components/CommentsChart.vue';
import { useStore } from 'vuex';
import { ArrowPathIcon } from '@heroicons/vue/24/solid';

const store = useStore();

store.dispatch('fetchPosts');
store.dispatch('fetchAllComments');

const posts = computed(() => store.state.posts);
const isLoadingPosts = computed(() => store.state.isLoadingPosts);

const comments = computed(() => store.state.allComments);
const isLoadingComments = computed(() => store.state.isLoadingAllComments);

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
  if (posts.value.length > 0) {
    const maxLength = Math.max(...postLengths.value);
    return posts.value.find((post) => post.body.length === maxLength);
  }
  return null;
});

const shortestPost = computed(() => {
  if (posts.value.length > 0) {
    const minLength = Math.min(...postLengths.value);
    return posts.value.find((post) => post.body.length === minLength);
  }
  return null;
});

const longestPostLength = computed(() => longestPost.value?.body.length || 0);
const shortestPostLength = computed(() => shortestPost.value?.body.length || 0);

const totalPosts = computed(() => posts.value.length);

const totalComments = computed(() => {
  return comments.value.length;
});
</script>
