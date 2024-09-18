import { createStore } from 'vuex';
import posts from './modules/posts';
import users from './modules/users';
import comments from './modules/comments';
import ui from './modules/ui';

const store = createStore({
  modules: {
    posts,
    users,
    comments,
    ui,
  },
});

export default store;
