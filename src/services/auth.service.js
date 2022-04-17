import axios from "axios";
import { LOGIN_URL } from "@/utils/apiConstants";

export function loginService(user) {
    return axios
        .post(LOGIN_URL, {
            email: user.email,
            password: user.password
        })
        .then(response => {
            if (response) {
                // WARNING!!!!!!! Please mention this is not best practice
                // JWT should be kept in httpOnly cookie
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response;
        })
}

export function logoutService() {
    localStorage.removeItem('user');
}