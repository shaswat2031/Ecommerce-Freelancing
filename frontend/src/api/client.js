import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Add a request interceptor to inject the token
client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // or from memory
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default client;
