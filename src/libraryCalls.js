import API from './api';

const getLibraryCategories = () =>
  API.get('/Library/categories')
    .then(response => response.data)
    .catch((error) => {
      throw error;
    });
export default getLibraryCategories;
