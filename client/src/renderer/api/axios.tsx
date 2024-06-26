import axios from 'axios';

export const BASE_URL = 'https://guis3.sakura.ne.jp/caily/';
//const BASE_URL = 'http://localhost/';
export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

axiosPrivate.defaults.headers.common[
  'Authorization'
] = `Bearer ${localStorage.getItem('token')}`;
