const state = () => ({
  isCollapsed: false,
  isSidebarOpen: false,
  isDarkMode: false,
  error: null,
});

const mutations = {
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
};

const actions = {
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
};

const getters = {
  isCollapsed: (state) => state.isCollapsed,
  isSidebarOpen: (state) => state.isSidebarOpen,
  isDarkMode: (state) => state.isDarkMode,
  error: (state) => state.error,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
