import axios from "axios";

export const baseURL = "http://localhost:8080";

const API = axios.create({
    baseURL: baseURL
});

API.interceptors.request.use(
    request => {
        let token = JSON.parse(localStorage.getItem("token"));

        if(token) {
            request.headers.Authorization = token;
        }

        return request;
    },
    error => {
        return Promise.reject(error);
    }
)

export default API;