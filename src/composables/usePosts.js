import { ref, onMounted } from 'vue';
import { apiService } from '../services/api';

export function usePosts() {
  const posts = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  const loadPosts = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const fetchedPosts = await apiService.fetchPosts();
      posts.value = fetchedPosts;
    } catch (err) {
      error.value = err.message || 'An error occurred while fetching posts.';
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    loadPosts();
  });

  return {
    posts,
    isLoading,
    error,
    loadPosts,
  };
}
