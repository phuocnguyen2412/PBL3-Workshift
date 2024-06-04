import axios from "axios";
import queryString from "query-string";

// Retrieve token from local storage
const token = localStorage.getItem("Authorization");
console.log(token);

// Create an axios instance
const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: token,
    },
});

axiosClient.interceptors.request.use(
    async (config) => {
        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        // Handle response errors
        console.error("API error:", error);
        throw error;
    }
);

export default axiosClient;
