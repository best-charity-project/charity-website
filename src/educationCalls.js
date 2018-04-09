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
  const query = {
    region: encodeURIComponent(region),
    regionDistricts: encodeURIComponent(regionDistricts),
    educationalInstitution: encodeURIComponent(educationalInstitution),
    program: encodeURIComponent(program),
  };

  if (!program) {
    return API.get(`education/filter?region=${query.region}&regionDistricts=${
      query.regionDistricts
    }&educationalInstitution=${
      query.educationalInstitution
    }&firstYear=${firstYear}&lastYear=${lastYear}`).then(response => response.data);
  }
  return API.get(`education/filter?region=${query.region}&regionDistricts=${
    query.regionDistricts
  }&educationalInstitution=${
    query.educationalInstitution
  }&firstYear=${firstYear}&lastYear=${lastYear}&program=${query.program}`).then(response => response.data);
};

const getEducation = userId =>
  API.get(`education?userId=${userId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
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

export {
  getLocations,
  addEducation,
  filterEducationalRoutes,
  getEducation,
  deleteEducation,
  updateEducation,
};
