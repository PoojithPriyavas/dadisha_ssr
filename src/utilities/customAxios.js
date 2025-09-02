import axios from 'axios';
import { isTokenValid } from './index.js';

const customAxios = axios.create({
  baseURL: 'https://admin.dadisha.com/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000,
});

customAxios.interceptors.request.use(
  config => {
    //const isAuthenticated = true; // Replace this with your authentication condition
    const token = localStorage.getItem('dadishaToken');

    if (token && isTokenValid()) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
export default customAxios;
