import axios from 'axios';
import URL from './configs/config.json';

export default axios.create({
  baseURL: URL.baseURL || process.env.BASEURL,
});
