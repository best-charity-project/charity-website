import axios from 'axios';

export default axios.create({
  baseURL: 'http://charity-server.herokuapp.com/api/',
});
