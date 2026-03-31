import axios from 'axios';

const api = axios.create({
    baseURL: 'https://studhunt-ai.onrender.com', // Tera Spring Boot ka address
});

export default api;