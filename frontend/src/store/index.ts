import Vue from "vue";
import Vuex, { Module, Store } from "vuex";

Vue.use(Vuex);

const store: Store<unknown> = new Vuex.Store({});
export default store;

const getModules = require("./indexer").getModules;

const modules: { [index: string]: Module<unknown, unknown> } = getModules();

for (const key in modules) store.registerModule(key, modules[key]);

