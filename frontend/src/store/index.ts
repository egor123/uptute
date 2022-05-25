import Vue from "vue";
import Vuex, { Store } from "vuex";

Vue.use(Vuex);

const store: Store<unknown> = new Vuex.Store({});
export default store;

function init() {
  const components: __WebpackModuleApi.RequireContext = require.context(
    "./modules",
    true,
    /.js$/
  );

  const arrOfModules: any[][] = components.keys().map((key) => {
    const moduleName: string = key.substring(2, key.length - 3),
      obj: any = components(key).default;
    return [moduleName, obj];
  });

  return Object.fromEntries(arrOfModules);
}

const modules = init();

for (const key in modules) {
  store.registerModule(key, modules[key]);
}

