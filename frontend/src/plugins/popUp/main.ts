import { VueConstructor } from "vue";
import popUps from "./popUps";

export default {
  install(Vue: VueConstructor<Vue>) {
    Vue.prototype.$pop = new Vue();

    for (const [key, value] of Object.entries(popUps))
      Vue.prototype.$pop[key] = value;
  },
};
