import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Ensure credentials are included if needed
});

axiosClient.interceptors.request.use(
    async (config) => {
        config.headers.Authorization =
            localStorage.getItem("Authorization") || "";
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response.data.message;
    },
    (error) => {
        // Handle response errors
        console.error("API error:", error);
        throw error.response.data.message;
    }
);

export default axiosClient;
