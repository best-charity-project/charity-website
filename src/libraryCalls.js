import API from './api';

const getCategoryItems = (categoryTag, type) =>
  API.get(`categories/${categoryTag}/${type}`).then(response => response.data);

const getLibraryCategories = () => API.get('/categories').then(response => response.data);
const addLibraryItem = libraryItem => API.post('libraryItems', libraryItem);

export { getLibraryCategories, addLibraryItem, getCategoryItems };
