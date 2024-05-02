import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Añade un interceptor para incluir el token en cada solicitud
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('userToken');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default axiosInstance;
