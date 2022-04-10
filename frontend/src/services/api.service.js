import axios from "axios";
import store from "@/store/index.js";
import { vm } from "@/main.js";

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
    headers: await getHeaders(withJwt),
  }).catch((err) => handleErr(err));
  // saveToStorage(res);
  return res;
}

function checkJwtExpiration() {
  if (isJwtExpired()) {
    store.dispatch("auth/logout");
    alert(vm.$l("auth.error.expired"));
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

async function getHeaders(withJwt) {
  let jwt = null;
  if (withJwt) jwt = await getJwt();
  return {
    Authorization: `Bearer ${jwt}`,
    "Content-Type": "application/json",
  };

  async function getJwt() {
    const jwt = await store.dispatch("auth/refreshJwt");
    console.log(jwt);
    return jwt;
  }
}

function handleErr(err) {
  console.error(err.response.data);
  return err;
}
