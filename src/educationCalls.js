import API from './api';
import appendAuthorizationHeaders from './appendAuthorizationHeaders';

const authHeader = appendAuthorizationHeaders();

const getLocations = () => API.get('locations').then(response => response.data);

const addEducation = (education) => {
  API.post('education', education, { headers: authHeader });
};
const getEducation = userId =>
  API.get(`education?userId=${userId}`, {
    headers: authHeader,
  }).then(response => response.data);

const deleteEducation = id =>
  API.delete(`education/${id}`, { headers: authHeader }).then(res => res.data);

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
    { headers: authHeader },
  ).then(res => res.data);
};

export { getLocations, addEducation, getEducation, deleteEducation, updateEducation };
