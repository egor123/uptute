import axios from "axios";
import store from "@/store/index.js";
// import router from "@/router";

export async function apiRequest({
  method,
  urlEnd,
  data = {},
  withJwt = true,
}) {
  if (withJwt && checkJwtExpiration()) return new Error("JWT expired");
  const res = await axios({
    method,
    url: "/api" + urlEnd,
    data: data,
    headers: getHeaders(withJwt),
  }).catch((err) => handleErr(err));
  // saveToStorage(res);
  return res;
}

function checkJwtExpiration() {
  if (isJwtExpired()) {
    store.dispatch("auth/logout");
    alert("Session expired"); // Change to sth from locales
    return true;
  }
  return false;
}

export function isJwtExpired() {
  const jwt = JSON.parse(sessionStorage.getItem("user")).jwt;
  if (!jwt) return true;
  const decodedJwt = parseJwt(jwt);
  return Date.now() > decodedJwt.exp * 1000;

  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  }
}

function getHeaders(withJwt) {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return {
    Authorization: withJwt ? `Bearer ${getJwt(user)}` : null,
    "Content-Type": "application/json",
  };

  function getJwt(user) {
    return user.jwt;
  }
}

// async function getJwt(refreshToken, user) {
//   let jwt = user.jwt;
//   if ((jwt == undefined || isJwtExpired(jwt)) && refreshToken != undefined) {
//     const res = await apiRequest({
//       method: "post",
//       urlEnd: "/auth/refreshToken",
//     });
//     jwt = res.jwt;
//   }
//   return jwt;
// }

function handleErr(err) {
  console.error(err.response.data);
  return err;
}
