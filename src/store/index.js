// store.js
import { createStore } from 'vuex';
import { apiService } from '../services/api';

const store = createStore({
  state: {
    posts: [],
    users: {},
    comments: {},
    allComments: [],
    isLoadingPosts: false,
    isLoadingComments: {},
    isLoadingAllComments: false,
    isLoadingUser: false,
    isCollapsed: false,
    isSidebarOpen: false,
    isDarkMode: false,
    error: null,
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    SET_USER(state, { userId, userData }) {
      state.users = { ...state.users, [userId]: userData };
    },
    SET_COMMENTS(state, { postId, comments }) {
      state.comments = { ...state.comments, [postId]: comments };
    },
    SET_ALL_COMMENTS(state, allComments) {
      state.allComments = allComments;
    },
    SET_LOADING_POSTS(state, isLoading) {
      state.isLoadingPosts = isLoading;
    },
    SET_LOADING_COMMENTS(state, { postId, isLoading }) {
      state.isLoadingComments = { ...state.isLoadingComments, [postId]: isLoading };
    },
    SET_LOADING_ALL_COMMENTS(state, isLoading) {
      state.isLoadingAllComments = isLoading;
    },
    SET_LOADING_USER(state, isLoading) {
      state.isLoadingUser = isLoading;
    },

    SET_SIDEBAR_COLLAPSED(state, isCollapsed) {
      state.isCollapsed = isCollapsed;
    },
    SET_SIDEBAR_OPEN(state, isSidebarOpen) {
      state.isSidebarOpen = isSidebarOpen;
    },
    SET_DARK_MODE(state, isDarkMode) {
      state.isDarkMode = isDarkMode;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    },
  },
  actions: {
    async fetchPosts({ commit, state }) {
      if (state.posts.length > 0) return;
      commit('SET_LOADING_POSTS', true);
      commit('CLEAR_ERROR');
      try {
        const posts = await apiService.fetchPosts();
        commit('SET_POSTS', posts);
      } catch (error) {
        commit('SET_ERROR', error.message || 'Failed to fetch posts.');
      } finally {
        commit('SET_LOADING_POSTS', false);
      }
    },
    async fetchAllComments({ commit, state }) {
      if (state.allComments.length > 0) return;
      commit('SET_LOADING_ALL_COMMENTS', true);
      commit('CLEAR_ERROR');
      try {
        const comments = await apiService.fetchAllComments();
        commit('SET_ALL_COMMENTS', comments);
      } catch (error) {
        commit('SET_ERROR', error.message || 'Failed to fetch all comments.');
      } finally {
        commit('SET_LOADING_ALL_COMMENTS', false);
      }
    },
    async fetchUser({ commit, state }, userId) {
      if (state.users[userId]) return;
      commit('SET_LOADING_USER', true);
      commit('CLEAR_ERROR');
      try {
        const user = await apiService.fetchUser(userId);
        commit('SET_USER', { userId, userData: user });
      } catch (error) {
        commit('SET_ERROR', error.message || `Failed to fetch user with ID ${userId}.`);
      } finally {
        commit('SET_LOADING_USER', false);
      }
    },
    async fetchComments({ commit, state }, postId) {
      if (state.comments[postId]) return;
      commit('SET_LOADING_COMMENTS', { postId, isLoading: true });
      commit('CLEAR_ERROR');
      try {
        const comments = await apiService.fetchComments(postId);
        commit('SET_COMMENTS', { postId, comments });
      } catch (error) {
        commit('SET_ERROR', error.message || `Failed to fetch comments for post ID ${postId}.`);
      } finally {
        commit('SET_LOADING_COMMENTS', { postId, isLoading: false });
      }
    },

    toggleCollapse({ commit, state }) {
      commit('SET_SIDEBAR_COLLAPSED', !state.isCollapsed);
    },
    toggleSidebar({ commit, state }) {
      commit('SET_SIDEBAR_OPEN', !state.isSidebarOpen);
    },
    closeSidebar({ commit }) {
      commit('SET_SIDEBAR_OPEN', false);
    },

    toggleTheme({ commit, state }) {
      const newTheme = !state.isDarkMode;
      commit('SET_DARK_MODE', newTheme);
      if (newTheme) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    },
    initializeTheme({ commit }) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        const isDark = savedTheme === 'dark';
        commit('SET_DARK_MODE', isDark);
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        commit('SET_DARK_MODE', true);
        document.documentElement.classList.add('dark');
      } else {
        commit('SET_DARK_MODE', false);
        document.documentElement.classList.remove('dark');
      }
    },
  },
  getters: {
    getPostById: (state) => (id) => {
      return state.posts.find((post) => post.id === id);
    },
    getUserById: (state) => (id) => {
      return state.users[id];
    },
    getCommentsByPostId: (state) => (postId) => {
      return state.comments[postId] || [];
    },
    isLoadingComments: (state) => (postId) => {
      return state.isLoadingComments[postId] || false;
    },
    isLoadingPosts: (state) => state.isLoadingPosts,
    allComments: (state) => state.allComments,
    isLoadingAllComments: (state) => state.isLoadingAllComments,
    isLoadingUser: (state) => state.isLoadingUser,
    error: (state) => state.error,
    isCollapsed: (state) => state.isCollapsed,
    isSidebarOpen: (state) => state.isSidebarOpen,
    isDarkMode: (state) => state.isDarkMode,
  },
});

export default store;
