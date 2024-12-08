import axios from "axios";


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const instance = axios.create({
    baseURL: BACKEND_URL,
});


// Add a request interceptor
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle expired token
instance.interceptors.response.use(
    (response) => response,  // If the request is successful
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or unauthorized, log out the user
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            window.location.href = "/login";  //
        }
        return Promise.reject(error);
    }
);


export default instance;
