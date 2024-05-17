import axios from 'axios';

export const BASE_URL = 'http://cailygroup.com/';
//const BASE_URL = 'http://localhost/';

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true
});

axiosPrivate.defaults.headers.common[
  'Authorization'
] = `Bearer ${localStorage.getItem('token')}`;
