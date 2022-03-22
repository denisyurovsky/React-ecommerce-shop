import axios from 'axios';
import { ACCESS_TOKEN } from '../constants/storageConstants';

const HEADERS = { 'Content-Type': 'application/json' };

const host = process.env.REACT_APP_API_HOST
  ? process.env.REACT_APP_API_HOST
  : '';

const requestSettings = {
  baseURL: host,
  headers: HEADERS,
};

const http = axios.create(requestSettings);

http.interceptors.request.use((config) => {
  const token =
    localStorage.getItem(ACCESS_TOKEN) ?? sessionStorage.getItem(ACCESS_TOKEN);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { http };
