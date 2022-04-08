import router from "@/router";
import auth from "../../services/auth.service";

export default {
  namespaced: true,
  state: {
    signedIn: false,
    roles: [],
  },
  actions: {
    async signup(ctx, form) {
      var response = await auth.signup(form);
      if (response.statusText == "OK") {
        router.push({ name: "LogIn" });
      } else {
        alert(response.response.data); //Change to something from locales
      }
      return response;
    },
    async signin(ctx, form) {
      const res = await auth.signin(form);
      console.log(res.data);
      if (res.statusText == "OK") {
        ctx.commit("mutate", { name: "roles", val: res.data.roles });
        // ctx.commit("mutate", { name: "uuid", val: res.data.uuid });
        ctx.commit("updateStatus", true);
        router.push({ name: "PrimarySettingUp" });
        return true;
      } else {
        ctx.commit("updateStatus", false);
        alert("Wrong username or password"); //Change to something from locales
        return false;
      }
    },
    async upgradeToTutor() {
      return await auth.upgradeToTutor();
    },
    async getUserDetails() {
      return await auth.getUserDetails();
    },
    logout(ctx) {
      ctx.commit("updateStatus", false);
      router.push({ name: "LogIn" });
    },
    isAuth(ctx) {
      const val = auth.isAuth();
      ctx.commit("updateStatus", val);
      return val;
    },
  },
  mutations: {
    updateStatus(state, signedIn) {
      if (!signedIn) auth.logout();
      state.signedIn = signedIn;
      console.log("signedIn:" + signedIn);
    },
    mutate(state, { name, val }) {
      state[name] = val;
    },
    tryAddRole(state, { role }) {
      if (!state.roles.includes(role)) state.roles.push(role);
    },
  },
  getters: {
    getStatus(state) {
      return state.signedIn;
    },
  },
};

