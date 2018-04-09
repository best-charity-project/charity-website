import API from './api';
import { getToken } from './Auth/Auth';

const getLocations = () => API.get('locations').then(response => response.data);

const addEducation = education =>
  API.post('education', education, { headers: { Authorization: `Bearer ${getToken()}` } });

const filterEducationalRoutes = (
  region,
  regionDistricts,
  educationalInstitution,
  firstYear,
  lastYear,
  program,
) => {
  if (!program) {
    return API.get(`education/filter?region=${encodeURIComponent(region)}&regionDistricts=${encodeURIComponent(regionDistricts)}&educationalInstitution=${encodeURIComponent(educationalInstitution)}&firstYear=${firstYear}&lastYear=${lastYear}`).then(response => response.data);
  }
  return API.get(`education/filter?region=${encodeURIComponent(region)}&regionDistricts=${encodeURIComponent(regionDistricts)}&educationalInstitution=${encodeURIComponent(educationalInstitution)}&firstYear=${firstYear}&lastYear=${lastYear}&program=${encodeURIComponent(program)}`).then(response => response.data);
};

const getEducation = userId =>
  API.get(`education?userId=${userId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(response => response.data);

export { getLocations, addEducation, filterEducationalRoutes, getEducation };
