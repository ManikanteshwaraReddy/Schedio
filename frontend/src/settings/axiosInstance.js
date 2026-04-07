import axios from 'axios';

axios.defaults.withCredentials = true; 
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL, 
    timeout: 10000, 
    headers: {
        'Content-Type': 'application/json', 
    },
});

export default axiosInstance;
