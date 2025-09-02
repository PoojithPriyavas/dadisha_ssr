// src/utilities/customAxios.js
import axios from 'axios';

// Create axios instance
const instance = axios.create({
  baseURL: '/', // Your base URL
});

// Response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific status codes
      if (error.response.status === 401 || error.response.status === 403) {
        // Clear user data
        localStorage.removeItem('dadishaToken');
        localStorage.removeItem('selectedProductIds');
        // Redirect to home with full page reload
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default instance;