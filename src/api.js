import axios from 'axios';

export default axios.create({
  baseURL: 'https://charity-server.herokuapp.com/api/',
});
