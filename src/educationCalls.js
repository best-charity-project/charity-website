import API from './api';
import { headers } from './Auth/Auth';

const getLocations = () => API.get('locations').then(response => response.data);

const addEducation = education => API.post('education', education, { headers });

const getEducation = userId =>
  API.get(`education?userId=${userId}`, {
    headers,
  }).then(response => response.data);

export { getLocations, addEducation, getEducation };
