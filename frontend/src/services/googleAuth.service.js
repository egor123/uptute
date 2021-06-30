// import { GOOGLE_OAUTH_CLIENT_ID } from "@/constants/index"

// function init() {
//     return new Promise(resolve => {
//         if (auth2 == undefined) {
//             let script = document.createElement('script');
//             script.setAttribute('src', 'https://apis.google.com/js/platform.js?onload=onLoad');
//             script.setAttribute("async", true);
//             script.setAttribute("defer", "defer");
//             script.setAttribute("id", "auth2_script_id");
//             document.head.appendChild(script);
//             window.onLoad = () => window.gapi.load('auth2', () => {
//                 auth2 = window.gapi.auth2.init({
//                     client_id: GOOGLE_OAUTH_CLIENT_ID,
//                     scope: 'profile email'
//                 })
//                 resolve();
//             });
//         }
//         else resolve()
//     })
// }

// function googleAuth() {
//     return new Promise((resolve, reject) => {
//         window.gapi.auth2.authorize({
//             client_id: GOOGLE_OAUTH_CLIENT_ID,
//             scope: 'email profile openid',
//             response_type: 'id_token permission',
//         }, (response) => {
//             if (response.error) reject(response);
//             else resolve(response);
//         })
//     })
// }

// function signIn() {
//     init().then(() => googleAuth())
//         .then(response =>
//             console.log(`%caccess token: %c${response.access_token}\n%cid token: %c${response.id_token}`, "color:black", "color:blue", "color:black", "color:blue")
//         )
// }

// export default {
//     signIn
// }


import { GOOGLE_OAUTH_CLIENT_ID } from "@/constants/index"
//import axios from 'axios';
var auth2;

function getAuth() {
    return new Promise(resolve => {
        if (auth2 == undefined) {
            let script = document.createElement('script');
            script.setAttribute('src', 'https://apis.google.com/js/platform.js?onload=onLoad');
            script.setAttribute("async", true);
            script.setAttribute("defer", "defer");
            script.setAttribute("id", "auth2_script_id");
            document.head.appendChild(script);
            window.onLoad = () => window.gapi.load('auth2', () => {
                auth2 = window.gapi.auth2.init({
                    client_id: GOOGLE_OAUTH_CLIENT_ID,
                    scope: 'profile email',
                    // ux_mode: 'redirect',
                    // redirect_uri: 'http://localhost:9000/api/auth/signIn'
                })
                resolve(auth2);
            });
        }
        else resolve(auth2)
    })
}

function signIn() {
    return getAuth()
        .then(auth => auth.signIn())
        // .then(auth => auth.grantOfflineAccess())
        // .then(resp => axios.post('/api/auth/google/signIn', resp.code))
        .then(resp => console.log(resp.qc.id_token))
}

export default {
    signIn
}