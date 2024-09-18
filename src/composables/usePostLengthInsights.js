import { ref, watch } from 'vue';
import { usePosts } from '../composables/usePosts';

export function usePostLengthInsights() {
  const postLengths = ref([]);
  const insights = ref({});
  const isLoading = ref(true);

  const { posts } = usePosts();

  const calculateInsights = (lengths) => {
    const sortedLengths = [...lengths].sort((a, b) => a - b);
    const total = lengths.reduce((sum, len) => sum + len, 0);
    const min = sortedLengths[0];
    const max = sortedLengths[sortedLengths.length - 1];
    const average = total / lengths.length;
    const median = sortedLengths[Math.floor(lengths.length / 2)];

    return { min, max, average, median, totalPosts: lengths.length };
  };

  watch(
    () => posts.value,
    (newPosts) => {
      if (newPosts.length > 0) {
        postLengths.value = newPosts.map((post) => post.body.length);
        insights.value = calculateInsights(postLengths.value);
        isLoading.value = false;
      }
    },
    { immediate: true }
  );

  return { postLengths, insights, isLoading };
}
