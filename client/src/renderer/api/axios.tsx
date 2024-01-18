import axios from "axios";

const BASE_URL = 'https://guis3.sakura.ne.jp/caily/';

export default axios.create({
  baseURL: BASE_URL
});

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
