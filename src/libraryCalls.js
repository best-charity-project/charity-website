import API from './api';

const getLibraryCategories = () =>
  API.get('categories')
    .then(response => response.data)
    .catch((error) => {
      throw error;
    });

const getCategoryItems = (categoryTag, type) =>
  API.get(`categories/${categoryTag}/libraryItems/${type}`).then(response => response.data);

export { getLibraryCategories, getCategoryItems };
