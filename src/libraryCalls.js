import API from './api';

const getLibraryCategories = () =>
  API.get('/Library/categories')
    .then(response => response.data);

const addLibraryItem = libraryItem =>
  API.post('libraryItemss', libraryItem);

export {
  getLibraryCategories,
  addLibraryItem,
};
