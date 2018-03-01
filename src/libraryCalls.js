import API from './api';

const getLibraryCategories = () =>
  API.get('/Library/categories')
    .then(response => response.data)
    .catch((error) => {
      throw error;
    });
const getLibraryItems = () =>
  API.get('/libraryItems')
    .then(response => response.data)
    .catch((error) => {
      throw error;
    });
export { getLibraryCategories, getLibraryItems };
