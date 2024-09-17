import { ref, watch } from 'vue';
import { apiService } from '../services/api';

export function usePostDetails(post) {
  const user = ref(null);
  const comments = ref([]);
  const loading = ref(true);
  const error = ref(null);

  async function fetchUser() {
    try {
      user.value = await apiService.fetchUser(post.userId);
    } catch (err) {
      error.value = 'Error fetching user';
      console.error('Error fetching user:', err);
    }
  }

  async function fetchComments() {
    try {
      comments.value = await apiService.fetchComments(post.id);
    } catch (err) {
      error.value = 'Error fetching comments';
      console.error('Error fetching comments:', err);
    }
  }

  async function fetchPostDetails() {
    loading.value = true;
    await Promise.all([fetchUser(), fetchComments()]); // Fetch both user and comments in parallel
    loading.value = false;
  }

  watch(
    () => post,
    (newPost) => {
      if (newPost) {
        fetchPostDetails();
      }
    },
    { immediate: true }
  );

  return {
    user,
    comments,
    loading,
    error,
  };
}
