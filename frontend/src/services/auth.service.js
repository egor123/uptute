import axios from "axios";
import { apiRequest } from "@/services/api.service.js";
import store from "@/store/index.js";

export default {
  async signup(form) {
    return await axios({
      method: "post",
      url: "/api/auth/signup",
      data: form,
    }).catch((err) => handleErr(err));
  },
  async signin(form) {
    const res = await axios({
      method: "post",
      url: "/api/auth/signin",
      data: form,
    }).catch((err) => handleErr(err));
    trySetTokens(res);
    return res;

    function trySetTokens(res) {
      if (res.statusText == "OK") {
        localStorage.setItem("refreshToken", res.data.refreshToken);
        delete res.data.refreshToken;
        sessionStorage.setItem("user", JSON.stringify(res.data));
        store.dispatch("auth/updateUser", res.data);
      }
    }
  },
  async upgradeToTutor() {
    return await apiRequest({
      method: "post",
      urlEnd: "/account/me/tutor",
    });
  },
  async getUserDetails() {
    return await apiRequest({
      method: "get",
      urlEnd: "/account/me",
    });
  },
  // logout() {
  //   localStorage.removeItem("user");
  // },
  // isAuth() {
  //   let user = JSON.parse(localStorage.getItem("user"));
  //   return Boolean(user && user.accessToken);
  // },
};

function handleErr(err) {
  console.error(err.response.data);
  return err;
}

