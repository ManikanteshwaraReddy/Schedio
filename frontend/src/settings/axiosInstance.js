import axios from 'axios';

axios.defaults.withCredentials = true; 
// Create an instance of Axios with custom configuration
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL, // Use environment variable for backend server URL
    timeout: 10000, // Request timeout in milliseconds
    headers: {
        'Content-Type': 'application/json', // Default content type
        // Add any other headers as needed
    },
});

export default axiosInstance;
