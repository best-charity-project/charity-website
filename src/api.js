import axios from 'axios';
import { baseURL } from './configs/config.json';

export default axios.create({
  baseURL: baseURL || process.env.BASEURL,
});
