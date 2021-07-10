import Vue from 'vue';
import Vuex from 'vuex';
// import lessons from './modules/lessons'
// import auth from './modules/auth'
// import navigation from './modules/navigation'

Vue.use(Vuex);

function init() {
  const components = require.context('./modules', false, /.js$/);
  console.log(components.keys());
  return components.keys().map(key => components(key).default);
}

export default new Vuex.Store({
  modules: {
    ...init(),
  }
});