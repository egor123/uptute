import axios from "axios";

export async function apiRequest({ method, urlEnd, data = {} }) {
  const res = await axios({
    method,
    url: "/api" + urlEnd,
    data: data,
    headers: getHeaders(),
  }).catch((err) => handleErr(err));
  // saveToStorage(res);
  return res;
}

function getHeaders() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  // jwt: getJwt(sessionStorage.getItem("user"), user),
  let headers = {
    Authorization: `Bearer ${user.jwt}`,
    "Content-Type": "application/json",
  };

  return headers;
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

// function isJwtExpired(jwt) {
//   var base64Url = jwt.split(".")[1];
//   var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//   var jsonPayload = decodeURIComponent(
//     atob(base64)
//       .split("")
//       .map(function(c) {
//         return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//       })
//       .join("")
//   );
//   return Date.now() > JSON.parse(jsonPayload).exp;
// }

// function saveToStorage(res) {
//   if (res.refreshToken != undefined)
//     localStorage.setItem("refreshToken", res.refreshToken);
//   if (res.jwt != undefined) sessionStorage.setItem("refreshToken", res.jwt);
// }

function handleErr(err) {
  console.error(err.response.data);
  return err;
}
