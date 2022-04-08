import axios from "axios";
import { apiRequest } from "@/services/api.service.js";

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
        sessionStorage.setItem("jwt", res.data.jwt);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        localStorage.setItem("uuid", res.data.uuid);
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
  logout() {
    localStorage.removeItem("user");
  },
  isAuth() {
    let user = JSON.parse(localStorage.getItem("user"));
    return Boolean(user && user.accessToken);
  },
};

function handleErr(err) {
  console.error(err.response.data);
  return err;
}

