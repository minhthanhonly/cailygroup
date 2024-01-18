import axios from "axios";

const BASE_URL = 'http://cailygroup.com/';

export default axios.create({
  baseURL: BASE_URL
});


axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
axios.interceptors.request.use(function(config){
  return config;
}, function (error){
  return Promise.reject(error);
})
