// import router from "@/router";
import account from "../../services/account.service";
// import store from "@/store/index.js";
// import l from "@/services/locale.service.js";
// import { vm } from "@/main";

export default {
  namespaced: true,
  state: {},
  actions: {
    async getUserDetails() {
      return await account.getUserDetails();
    },
    async updateUserDetails(ctx, { data }) {
      return await account.updateUserDetails({ data });
    },
  },
  mutations: {
    mutate(state, { name, val }) {
      state[name] = val;
    },
  },
};
