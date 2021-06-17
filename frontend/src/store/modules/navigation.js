export default {
    actions: {
        setNavBar({ commit, state }, val) {
            if (state.navBar !== val)
                commit('updateNavBar', val);
        },
        setMobileView({ commit }, val){
            if(val === false)
                commit('updateNavBar', val);
            commit('updateMobileView', val);
        }
    },
    mutations: {
        updateNavBar(state, val) { state.navBar = val; },
        updateMobileView(state, val) {state.mobileView = val; }
    },
    state: {
        navBar: false,
        mobileView: Boolean,
    },
    getters: {
        isMobileView(state) { return state.mobileView },
        getNavBar(state) { return state.navBar }
    }
}