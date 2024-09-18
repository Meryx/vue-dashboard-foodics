const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const apiService = {
  async fetchPosts() {
    const response = await fetch(`${BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await response.json();
    return data;
  },

  async fetchUser(userId) {
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    const data = await response.json();
    return data;
  },

  async fetchComments(postId) {
    const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    const data = await response.json();
    return data;
  },

  async fetchAllComments() {
    const response = await fetch(`${BASE_URL}/comments`);
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    const data = await response.json();
    return data;
  },
};
