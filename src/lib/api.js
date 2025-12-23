import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://portfolio-api-production-5604.up.railway.app/api',
    withCredentials: true,
});

export default api;
