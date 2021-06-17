import Vue from 'vue'
import Vuex from 'vuex'
import lessons from './modules/lessons'
import auth from './modules/auth'
import navigation from './modules/navigation'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    lessons,
    auth,
    navigation
  }
})