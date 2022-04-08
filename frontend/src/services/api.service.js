import axios from "axios";

// localStorage.setItem("refreshToken", "asda31fg24g");
// sessionStorage.setItem("jwt", "23f224gga");

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
  let headers = {
    refreshToken: localStorage.getItem("refreshToken"),
    // jwt: getJwt(sessionStorage.getItem("refreshToken")),
    jwt: sessionStorage.getItem("jwt"),

    "Content-Type": "application/json",
  };
  console.log(headers.refreshToken);
  console.log(headers.jwt);

  return headers;
}

// async function getJwt(refreshToken) {
//   let jwt = sessionStorage.getItem("jwt");
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
