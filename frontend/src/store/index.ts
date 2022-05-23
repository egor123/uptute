import Vue from "vue";
import Vuex from "vuex";
// import lessons from './modules/lessons'
// import auth from './modules/auth'
// import navigation from './modules/navigation'

Vue.use(Vuex);

function init() {
  const components = require.context("./modules", false, /.js$/);

  const arrOfModules = components.keys().map((key) => {
    const moduleName = key.substring(2, key.length - 3),
      obj = components(key).default;
    return [moduleName, obj];
  });

  return Object.fromEntries(arrOfModules);
}

export default new Vuex.Store({
  modules: init(),
});
