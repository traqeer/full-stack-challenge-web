import axios from 'axios';

export const API_URL =
  typeof window === 'undefined' ? process.env.VITE_API_URL : import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
