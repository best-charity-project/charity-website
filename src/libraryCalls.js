import API from './api';

const getLibraryCategories = () =>
  API.get('/Library/categories')
    .then(response => response.data)
    .catch((error) => {
      throw error;
    });

const addLibraryItem = libraryItem =>
  API.post('libraryItems', libraryItem).catch((err) => {
    throw err;
  });

export {
  getLibraryCategories,
  addLibraryItem,
};
