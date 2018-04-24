import API from './api';
import appendAuthorizationHeaders from './appendAuthorizationHeaders';

const getLocations = () => API.get('locations').then(response => response.data);

const addEducation = education => API.post('education', education, { headers: appendAuthorizationHeaders() }).then(response => response.data);

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

  let url = `education/filter?region=${query.region}&regionDistricts=${
    query.regionDistricts
  }&educationalInstitution=${
    query.educationalInstitution
  }&firstYear=${firstYear}&lastYear=${lastYear}`;

  if (program) {
    url = `${url}&program=${query.program}`;
  }

  return API.get(url).then(response => response.data);
};

const getEducation = userId =>
  API.get(`education?userId=${userId}`, {
    headers: appendAuthorizationHeaders(),
  }).then(response => response.data);

const deleteEducation = id =>
  API.delete(`education/${id}`, { headers: appendAuthorizationHeaders() }).then(res => res.data);

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
    { headers: appendAuthorizationHeaders() },
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
