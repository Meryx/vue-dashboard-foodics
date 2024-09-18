import { apiService } from '../../services/api';
const state = () => ({
  comments: {},
  allComments: [],
  isLoadingComments: {},
  isLoadingAllComments: false,
});

const mutations = {
  SET_COMMENTS(state, { postId, comments }) {
    state.comments = { ...state.comments, [postId]: comments };
  },
  SET_ALL_COMMENTS(state, allComments) {
    state.allComments = allComments;
  },
  SET_LOADING_COMMENTS(state, { postId, isLoading }) {
    state.isLoadingComments = { ...state.isLoadingComments, [postId]: isLoading };
  },
  SET_LOADING_ALL_COMMENTS(state, isLoading) {
    state.isLoadingAllComments = isLoading;
  },
};

const actions = {
  async fetchComments({ commit, state }, postId) {
    if (state.comments[postId]) return;
    commit('SET_LOADING_COMMENTS', { postId, isLoading: true });
    commit('ui/CLEAR_ERROR', null, { root: true });
    try {
      const comments = await apiService.fetchComments(postId);
      commit('SET_COMMENTS', { postId, comments });
    } catch (error) {
      commit('ui/SET_ERROR', error.message || `Failed to fetch comments for post ID ${postId}.`, {
        root: true,
      });
    } finally {
      commit('SET_LOADING_COMMENTS', { postId, isLoading: false });
    }
  },
  async fetchAllComments({ commit, state }) {
    if (state.allComments.length > 0) return;
    commit('SET_LOADING_ALL_COMMENTS', true);
    commit('ui/CLEAR_ERROR', null, { root: true });
    try {
      const comments = await apiService.fetchAllComments();
      commit('SET_ALL_COMMENTS', comments);
    } catch (error) {
      commit('ui/SET_ERROR', error.message || 'Failed to fetch all comments.', { root: true });
    } finally {
      commit('SET_LOADING_ALL_COMMENTS', false);
    }
  },
};

const getters = {
  getCommentsByPostId: (state) => (postId) => {
    return state.comments[postId] || [];
  },
  isLoadingComments: (state) => (postId) => {
    return state.isLoadingComments[postId] || false;
  },
  allComments: (state) => state.allComments,
  isLoadingAllComments: (state) => state.isLoadingAllComments,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
