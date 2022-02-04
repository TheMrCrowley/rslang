import axios from 'axios';

const API_URL = 'https://react-rslang-test.herokuapp.com/';
const TOKEN_LOCAL_STORAGE_KEY = 'access-token';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use(config => {
  const configCopy = JSON.parse(JSON.stringify(config));
  configCopy.headers.Authorization = `Bearer ${localStorage.getItem(
    TOKEN_LOCAL_STORAGE_KEY
  )}`;
  return config;
});

export default $api;
