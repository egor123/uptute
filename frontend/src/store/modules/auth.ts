import router from "@/router";
import auth from "@/services/auth.service";
import store from "@/store/index";
import { vm } from "@/main";

import { AuthenticationServiceClient } from "@/../proto/AuthServiceClientPb";
import { SignupRequest } from "@/../proto/auth_pb";
import { req } from "@/services/lesson/base";

export default {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    roles(state) {
      pullUser(state);
      return state?.user?.roles || [];
    },
  },
  actions: {
    async signup(ctx, form: SignupRequest.AsObject) {
      // ! ----------------------------------

      const client = new AuthenticationServiceClient("http://localhost:9090/");
      const request = new SignupRequest();
      request.setEmail(form.email);
      request.setPassword(form.password);
      console.warn(request);
      const r = await client.signup(request, null);
      console.warn(r);
      // ! ----------------------------------

      // form: { email: string, password: string }

      // var response = await auth.signup(form);
      // if (response.statusText == "OK") {
      //   const r = await ctx.dispatch("signin", {
      //     form,
      //     routeName: "PrimarySettingUp",
      //   });
      //   if (r.statusText != "OK") router.push({ name: "LogIn" });
      // } else alert(vm.$l("auth.error.email_exists"));
      // return response;
    },
    async signin(ctx, { form, routeName = null }) {
      const res = await auth.signin(form);
      console.warn("SIGNIN", res);
      if (res.statusText == "OK") routerPush(routeName);
      else alert(vm.$l("auth.error.email_or_password"));
      return res;

      function routerPush(routeName) {
        const roles = store.state.auth.user?.roles || [];
        if (routeName) router.push({ name: routeName });
        else if (roles.includes("ROLE_TUTOR"))
          router.push({ name: "ChooseAStudent" });
        else router.push({ name: "FindATutor" });
      }
    },

    async getUserDetails() {
      return await auth.getUserDetails();
    },
    async refreshJwt() {
      return await auth.refreshJwt();
    },
    logout(ctx) {
      ctx.dispatch("updateUser", {});
      localStorage.removeItem("refreshToken");
      router.push({ name: "LogIn" });
    },
    async tryAddRole(ctx, { role }) {
      const user = JSON.parse(sessionStorage.getItem("user"));
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

function pullUser(state) {
  if (!state.user) state.user = JSON.parse(sessionStorage.getItem("user"));
}
