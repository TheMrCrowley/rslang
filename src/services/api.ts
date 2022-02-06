import axios from 'axios';
import getAccessToken from '../helpers/getAccessToken';

const API_URL = 'https://react-rslang-test.herokuapp.com/';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${getAccessToken()}`;
  return config;
});

export default $api;
