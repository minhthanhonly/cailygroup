import axios from "axios";

const BASE_URL = 'https://guis3.sakura.ne.jp/caily/';

export default axios.create({
  baseURL: BASE_URL
});
