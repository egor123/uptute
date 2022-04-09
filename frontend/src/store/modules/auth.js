import router from "@/router";
import auth from "../../services/auth.service";
import store from "@/store/index.js";

export default {
  namespaced: true,
  state: {
    user: null,
  },

  actions: {
    async signup(ctx, form) {
      var response = await auth.signup(form);
      if (response.statusText == "OK") {
        const r = await ctx.dispatch("signin", {
          form,
          routeName: "PrimarySettingUp",
        });
        if (r.statusText != "OK") router.push({ name: "LogIn" });
      } else alert(response.response.data); //Change to something from locales

      return response;
    },
    async signin(ctx, { form, routeName = null }) {
      const res = await auth.signin(form);
      if (res.statusText == "OK") routerPush(routeName);
      else alert("Wrong username or password"); //Change to something from locales
      return res;

      function routerPush(routeName) {
        const roles = store?.state?.auth?.user?.roles || [];
        if (routeName) router.push({ name: routeName });
        else if (roles.includes("ROLE_TUTOR"))
          router.push({ name: "ChooseAStudent" });
        else router.push({ name: "FindATutor" });
      }
    },
    async upgradeToTutor() {
      return await auth.upgradeToTutor();
    },
    async getUserDetails() {
      return await auth.getUserDetails();
    },
    async logout(ctx) {
      ctx.dispatch("updateUser", {});
      router.push({ name: "LogIn" });
    },
    // isAuth(ctx) {
    //   const val = auth.isAuth();
    //   ctx.commit("updateStatus", val);
    //   return val;
    // },
    async tryAddRole(ctx, { role }) {
      let user = JSON.parse(sessionStorage.getItem("user"));
      if (!user.roles.includes(role)) {
        user.roles.push(role);
        ctx.dispatch("updateUser", user);
        return true;
      }
      return false;
    },
    async updateUser(ctx, user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      ctx.commit("mutate", { name: "user", val: user });
    },
  },
  mutations: {
    mutate(state, { name, val }) {
      state[name] = val;
    },
  },
};

