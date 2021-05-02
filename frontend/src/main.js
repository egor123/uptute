import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueAnalytics from 'vue-analytics'
import { BackendService, AuthService, LocaleService } from './services';


Vue.prototype.$backend = BackendService;
Vue.prototype.$auth = AuthService;
Vue.prototype.$l = LocaleService;

Vue.use(VueAnalytics, {
  id: 'UA-193056943-1',
  router,
  autoTracking: {
    pageviewTemplate(route) {
      return route.name
    }
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')