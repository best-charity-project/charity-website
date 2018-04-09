import API from './api';
import { headers } from './Auth/Auth';

const getLocations = () => API.get('locations').then(response => response.data);

const addEducation = education => API.post('education', education, { headers });

const getEducation = userId =>
  API.get(`education?userId=${userId}`, {
    headers,
  }).then(response => response.data);

const deleteEducation = id =>
  API.delete(`education/${id}`, { headers: { Authorization: `Bearer ${getToken()}` } }).then(res => res.data);

const updateEducation = (id, education) => {
  const {
    name,
    phone,
    email,
    regionIndex,
    regionDistricts,
    city,
    educationalInstitution,
    firstYear,
    lastYear,
    program,
    region,
  } = education;
  return API.put(
    `education/${id}`,
    {
      name,
      phone,
      email,
      regionIndex,
      regionDistricts,
      city,
      educationalInstitution,
      firstYear,
      lastYear,
      program,
      region,
    },
    { headers: { Authorization: `Bearer ${getToken()}` } },
  ).then(res => res.data);
};

export { getLocations, addEducation, getEducation, deleteEducation, updateEducation };
