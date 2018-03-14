import API from './api';

const getLocations = () => API.get('locations').then(response => response.data);

const addEducation = Education => API.post('education', Education);

export { getLocations, addEducation };
