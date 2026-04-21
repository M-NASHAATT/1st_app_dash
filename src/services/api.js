import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,  // e.g. http://187.124.12.183:8090/api
  
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});

// THIS IS THE INTERCEPTOR THEY ARE ASKING ABOUT
// It automatically attaches the Bearer token to every request!
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;