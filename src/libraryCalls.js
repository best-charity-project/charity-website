import API from './api';

const getLibraryItems = (categoryTag, type) =>
  API.get(`library/?categoryTag=${categoryTag}&type=${type}`).then(response => response.data);

const getLibraryCategories = () => API.get('categories').then(response => response.data);

const addLibraryItem = libraryItem => API.post('library', libraryItem);

const getPendingItems = () => API.get('library/pending').then(response => response.data);

const acceptPendingItems = (id) => {
  API.put(`library/${id}`);
};

const rejectPendingItems = (id) => {
  API.delete(`library/${id}`);
};

export {
  getLibraryCategories,
  addLibraryItem,
  getLibraryItems,
  getPendingItems,
  acceptPendingItems,
  rejectPendingItems,
};
