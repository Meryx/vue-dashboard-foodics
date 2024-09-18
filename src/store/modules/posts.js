import { apiService } from '../../services/api';
const state = () => ({
  posts: [],
  isLoadingPosts: false,
});

const mutations = {
  SET_POSTS(state, posts) {
    state.posts = posts;
  },
  SET_LOADING_POSTS(state, isLoading) {
    state.isLoadingPosts = isLoading;
  },
};

const actions = {
  async fetchPosts({ commit, state }) {
    if (state.posts.length > 0) return;
    commit('SET_LOADING_POSTS', true);
    commit('ui/CLEAR_ERROR', null, { root: true });
    try {
      const posts = await apiService.fetchPosts();
      commit('SET_POSTS', posts);
    } catch (error) {
      commit('ui/SET_ERROR', error.message || 'Failed to fetch posts.', { root: true });
    } finally {
      commit('SET_LOADING_POSTS', false);
    }
  },
};

const getters = {
  getPostById: (state) => (id) => state.posts.find((post) => post.id === id),
  allPosts: (state) => state.posts,
  isLoading: (state) => state.isLoadingPosts,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
