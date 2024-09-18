import { ref, onMounted } from 'vue';
import { apiService } from '../services/api';

export function usePostsWithComments() {
  const posts = ref([]);
  const comments = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const loadPostsWithComments = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const fetchedPosts = await apiService.fetchPosts();
      const fetchedComments = await apiService.fetchAllComments();

      posts.value = fetchedPosts;
      comments.value = fetchedComments;
    } catch (err) {
      error.value = err.message || 'An error occurred while fetching posts with comments.';
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    loadPostsWithComments();
  });

  return {
    posts,
    comments,
    isLoading,
    error,
    loadPostsWithComments,
  };
}
