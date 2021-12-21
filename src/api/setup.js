import axios from 'axios';

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
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    'accessToken'
  )}`;

  return config;
});

export { http };
