import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined' && !process.env.NEXT_PUBLIC_API_URL) {
    return Promise.reject(new Error('NEXT_PUBLIC_API_URL não está configurado'));
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login') && !window.location.pathname.startsWith('/definir-senha')) {
        window.location.href = '/login';
      }
    }
    const message = error.response?.data?.error || error.message || 'Erro na requisição';
    return Promise.reject(new Error(message));
  }
);

export default api;
