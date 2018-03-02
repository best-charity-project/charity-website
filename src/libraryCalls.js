import API from './api';

const getLibraryCategories = () => API.get('/categories').then(response => response.data);
const getLibraryItems = () => API.get('/libraryItems').then(response => response.data);
export { getLibraryCategories, getLibraryItems };
