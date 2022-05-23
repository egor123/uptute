import { GOOGLE_OAUTH_CLIENT_ID } from "@/constants/index"
//import axios from 'axios';
let auth2;

function getAuth() {
    return new Promise(resolve => {
        if (auth2 == undefined) {
            const script = document.createElement('script');
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
        // .then(auth => auth.signIn())
        .then(auth => auth.grantOfflineAccess())
        // .then(resp => axios.post('/api/auth/google/signIn', resp.code))
        .then(resp => console.log(resp.code));
}

export default {
    signIn
}