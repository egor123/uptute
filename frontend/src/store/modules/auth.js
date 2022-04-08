import router from "@/router";
import auth from "../../services/auth.service";

export default {
  namespaced: true,
  state: {
    user: null,
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
        router.push({ name: "PrimarySettingUp" });
        return true;
      } else {
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
    // logout(ctx) {
    //   ctx.commit("updateStatus", false);
    //   router.push({ name: "LogIn" });
    // },
    // isAuth(ctx) {
    //   const val = auth.isAuth();
    //   ctx.commit("updateStatus", val);
    //   return val;
    // },
    tryAddRole(ctx, { role }) {
      let user = JSON.parse(sessionStorage.getItem("user"));
      if (!user.roles.includes(role)) {
        sessionStorage.setItem("user", JSON.stringify(user));
        ctx.dispatch("updateUser");
      }
    },
    updateUser(ctx) {
      console.log("try update");
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

