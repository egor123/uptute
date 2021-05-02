import { url } from "../constants"

export default {
    async fetch({ path, params, method = "POST", data }) {
        var _url = url + path;

        if (params != undefined)
            for (var i = 0; i < params.length; i++)
                _url += ((i == 0) ? "?" : "&") + params[i].name + "=" + params[i].val;



        var requestOptions = { method: method };
        let user = JSON.parse(localStorage.getItem('user'));
        if (user && user.accessToken) {
            if (data == undefined) {
                requestOptions.headers = { 'Authorization': 'Bearer ' + user.accessToken };
            }
            else {
                requestOptions.headers = { "Content-Type": "application/json", 'Authorization': 'Bearer ' + user.accessToken };
                requestOptions.body = JSON.stringify(data);
            }
        }
        else if (data != undefined) {
            requestOptions.headers = { "Content-Type": "application/json" };
            requestOptions.body = JSON.stringify(data);
        }



        // console.log(requestOptions);

        _url;
        requestOptions;
        var res = null;
        // const res = await fetch(_url, requestOptions);
        return res;
    },
}