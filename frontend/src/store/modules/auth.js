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
        console.log(r);
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
    // logout(ctx) {
    //   ctx.commit("updateStatus", false);
    //   router.push({ name: "LogIn" });
    // },
    // isAuth(ctx) {
    //   const val = auth.isAuth();
    //   ctx.commit("updateStatus", val);
    //   return val;
    // },
    async tryAddRole(ctx, { role }) {
      let user = JSON.parse(sessionStorage.getItem("user"));
      if (!user.roles.includes(role)) {
        user.roles.push(role);
        sessionStorage.setItem("user", JSON.stringify(user));
        const r = await ctx.dispatch("updateUser");
        console.log(ctx.state.user.roles);
        return r;
      }
      return false;
    },
    updateUser(ctx) {
      const user = JSON.parse(sessionStorage.getItem("user"));
      ctx.commit("mutate", { name: "user", val: user });
    },
  },
  mutations: {
    mutate(state, { name, val }) {
      state[name] = val;
    },
  },
};

