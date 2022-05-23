import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueAnalytics from "vue-analytics";
import VueAnimate from "vue-animate-scroll";
import { BackendService, AuthService, LocaleService } from "./services";
import mdiVue from "mdi-vue/v2";
import * as mdijs from "@mdi/js";
import mobileInput from "./plugins/mobileInput.js";

Vue.prototype.$backend = BackendService;
Vue.prototype.$auth = AuthService;
Vue.prototype.$l = LocaleService;

export const bus = new Vue();

Vue.use(VueAnalytics, {
  id: "UA-193056943-1",
  router,

  autoTracking: {
    pageviewTemplate(route) {
      return route.name;
    },
  },
});

Vue.use(mdiVue, {
  icons: mdijs,
});

Vue.use(VueAnimate);
Vue.use(mobileInput);
export const vm = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

