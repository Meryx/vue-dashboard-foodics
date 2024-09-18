import { apiService } from '../../services/api';
const state = () => ({
  users: {},
  isLoadingUser: false,
});

const mutations = {
  SET_USER(state, { userId, userData }) {
    state.users = { ...state.users, [userId]: userData };
  },
  SET_LOADING_USER(state, isLoading) {
    state.isLoadingUser = isLoading;
  },
};

const actions = {
  async fetchUser({ commit, state }, userId) {
    if (state.users[userId]) return;
    commit('SET_LOADING_USER', true);
    commit('ui/CLEAR_ERROR', null, { root: true });
    try {
      const user = await apiService.fetchUser(userId);
      commit('SET_USER', { userId, userData: user });
    } catch (error) {
      commit('ui/SET_ERROR', error.message || `Failed to fetch user with ID ${userId}.`, {
        root: true,
      });
    } finally {
      commit('SET_LOADING_USER', false);
    }
  },
};

const getters = {
  getUserById: (state) => (id) => {
    return state.users[id];
  },
  isLoading: (state) => state.isLoadingUser,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
