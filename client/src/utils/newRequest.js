// utils/newRequest.js
import axios from "axios";

const newRequest = axios.create({
    baseURL: "http://localhost:8800/api/",
    withCredentials: true, // fine for cookies, not needed for Authorization headers
});

newRequest.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // or sessionStorage, wherever you store it
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default newRequest;
