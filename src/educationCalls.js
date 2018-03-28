import API from './api';

const getLocations = () => API.get('locations').then(response => response.data);

const addEducation = education => API.post('education', education);

export { getLocations, addEducation };
