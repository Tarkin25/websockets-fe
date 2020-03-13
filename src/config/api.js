import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080"
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