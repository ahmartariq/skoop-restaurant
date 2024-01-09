import axios from "axios";
import { HOSTNAME } from "./Config";

import { getToken } from "./src/redux/userSlice";

const axiosClient = axios.create({
    baseURL: HOSTNAME,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to pass the token with each request
axiosClient.interceptors.request.use(
    async (config) => {
        const token = getToken();
        if( token ) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

export default axiosClient;