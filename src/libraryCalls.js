import API from './api';

const getLibraryItems = (categoryTag, type) =>
  API.get(`library/?categoryTag=${categoryTag}&type=${type}`).then(response => response.data);

const getLibraryCategories = () => API.get('categories').then(response => response.data);

const addLibraryItem = libraryItem => API.post('library', libraryItem);

export { getLibraryCategories, addLibraryItem, getLibraryItems };
