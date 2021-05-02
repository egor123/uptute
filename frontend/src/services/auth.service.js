import backend from "./backend.service"
export default {
    async signup(name, email, password) {
        var form = { username: name, email: email, password: password };
        var response = await backend.fetch({ path: "auth/signup", data: form });
        console.log(response);
        return response;
    },
    async signin(name, password) {
        const form = { username: name, password: password };
        const response = await backend.fetch({ path: "auth/signin", data: form });
        const user = await response.json();
        console.log(user);
        if (user.accessToken) { 
            localStorage.setItem('user', JSON.stringify(user));
            console.log(user.accessToken);
        }
        return response;
    },
    logout(){
        localStorage.removeItem('user');
    },
    isAuth(){
        let user = JSON.parse(localStorage.getItem('user'));
        return (Boolean)(user && user.accessToken);
    }
}