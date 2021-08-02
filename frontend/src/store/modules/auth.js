import router from "@/router";
import auth from "../../services/auth.service";
export default {
  actions: {
    async signup(ctx, form) {
      var response = await auth.signup(form.name, form.email, form.password);
      if (response.ok) {
        router.push({ name: "LogIn" });
      } else {
        ctx.commit("updateStatus", false);
      }
      return await response.json();
    },
    async signin(ctx, form) {
      var response = await auth.signin(form.name, form.password);
      if (response.ok) {
        ctx.commit("updateStatus", true);
        router.push({ name: "Home" });
        return "";
      } else {
        ctx.commit("updateStatus", false);
        return "Wrong username or password";
      }
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
  },
  state: {
    signedIn: false,
  },
  getters: {
    getStatus(state) {
      return state.signedIn;
    },
  },
};
