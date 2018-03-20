import API from './api';

const getLibraryItems = (categoryTag, type) =>
  API.get(`library/?categoryTag=${categoryTag}&type=${type}`).then(response => response.data);

const getLibraryCategories = () => API.get('categories').then(response => response.data);

const addLibraryItem = libraryItem => API.post('library', libraryItem);

const fullTextLibrarySearch = (textSearch, checkedTypes) =>
  API.get(`library/search/?textSearch=${textSearch}&types=${checkedTypes}`).then(response => response.data);

export { getLibraryCategories, addLibraryItem, getLibraryItems, fullTextLibrarySearch };
