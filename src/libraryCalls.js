import API from './api';

const getLibraryCategories = () =>
  API.get('categories')
    .then(response => response.data);

const addLibraryItem = libraryItem =>
  API.post('libraryItems', libraryItem);

export {
  getLibraryCategories,
  addLibraryItem,
};
