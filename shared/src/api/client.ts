import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Create axios instance with default configuration
const createApiClient = (baseURL: string): AxiosInstance => {
  const client = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      // Add auth token if available
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle common errors
      if (error.response?.status === 401) {
        // Handle unauthorized
        localStorage.removeItem('authToken');
      }
      return Promise.reject(error);
    }
  );

  return client;
};

// Default API client
export const apiClient = createApiClient(
  process.env.VITE_API_URL || 
  process.env.EXPO_PUBLIC_API_URL || 
  'http://localhost:5000'
);

export { createApiClient };
export type { AxiosInstance, AxiosRequestConfig }; 