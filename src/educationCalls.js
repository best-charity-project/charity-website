import API from './api';
import { getToken } from './Auth/Auth';

const getLocations = () => API.get('locations').then(response => response.data);

const addEducation = education =>
  API.post('education', education, { headers: { Authorization: `Bearer ${getToken()}` } });

const getEducation = userId =>
  API.get(`education?userId=${userId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(response => response.data);

const deleteEducation = id =>
  API.delete(`education/${id}`, { headers: { Authorization: `Bearer ${getToken()}` } }).then(res => res.data);

export { getLocations, addEducation, getEducation, deleteEducation };
