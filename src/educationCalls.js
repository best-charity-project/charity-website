import API from './api';
import { getToken } from './Auth/Auth';

const getLocations = () => API.get('locations').then(response => response.data);

const addEducation = education =>
  API.post('education', education, { headers: { Authorization: `Bearer ${getToken()}` } });

export { getLocations, addEducation };
