import axios from "axios";

const BASE_URL = 'http://cailygroup.com/';

export default axios.create({
  baseURL: BASE_URL
});
