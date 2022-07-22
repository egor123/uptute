import axios from "axios";
import store from "@/store";
import { vm } from "@/main";

export async function apiRequest({
  method,
  urlEnd,
  data = {},
  withJwt = true,
}) {
  const jwt = withJwt ? await getJwt() : null;
  if (withJwt && (await checkJwtExpiration(jwt)))
    return new Error("JWT expired");
  const res = await axios({
    method,
    url: "/api" + urlEnd,
    data: data,
    headers: getHeaders(jwt, withJwt),
  }).catch((err) => handleErr(err));
  // saveToStorage(res);
  return res;
}

async function checkJwtExpiration(jwt) {
  if (!jwt || (await isJwtExpired(jwt))) {
    store.dispatch("auth/logout");
    alert(vm.$l("auth.error.expired"));
    return true;
  }
  return false;
}

export async function isJwtExpired(jwt = undefined) {
  if (jwt === undefined) jwt = await getJwt();
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

function getHeaders(jwt, withJwt) {
  let headers = {
    "Content-Type": "application/json",
  };
  if (withJwt) headers.Authorization = `Bearer ${jwt}`;
  return headers;
}

export async function getJwt() {
  const jwt = await store.dispatch("auth/refreshJwt").then((r) => r?.data?.jwt);
  return jwt;
}

function handleErr(err) {
  console.error(err.response.data);
  return err;
}
