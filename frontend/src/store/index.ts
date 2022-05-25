import Vue from "vue";
import Vuex, { Module, Store } from "vuex";

Vue.use(Vuex);

const store: Store<unknown> = new Vuex.Store({});
export default store;

interface Modules {
  [index: string]: any;
}

const modules: Modules = (): Modules => {
  const folder: __WebpackModuleApi.RequireContext = getFolder();
  return Object.fromEntries(getModulesArr());

  function getFolder(): __WebpackModuleApi.RequireContext {
    const params: [string, boolean, RegExp] = ["./modules", true, /.js$/];
    return require.context(...params);
  }
  function getModulesArr(): [string, any][] {
    return folder.keys().map((key) => getKeyValPairArr(key));

    function getKeyValPairArr(key: string): [string, any] {
      const moduleName: string = key.substring(2, key.length - 3);
      const module: any = folder(key).default;
      return [moduleName, module];
    }
  }
};

for (const key in modules) {
  store.registerModule(key, modules[key]);
}

