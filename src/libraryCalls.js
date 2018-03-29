import API from './api';
import { getToken } from './Auth/Auth';

const getLibraryItems = (categoryTag, type) =>
  API.get(`library/?categoryTag=${categoryTag}&type=${type}`).then(response => response.data);

const getLibraryCategories = () => API.get('categories').then(response => response.data);

const addLibraryItem = libraryItem =>
  API.post('library', libraryItem, { headers: { Authorization: `Bearer ${getToken()}` } })
    .then(res => res.data)
    .catch(err => err.response.data);

const fullTextLibrarySearch = (textSearch, checkedTypes) =>
  API.get(`library/search/?textSearch=${textSearch}&types=${checkedTypes}`).then(response => response.data);

const getPendingItems = () => API.get('library/pending').then(response => response.data);

const acceptPendingItems = id =>
  API.put(`library/${id}`, {}, { headers: { Authorization: `Bearer ${getToken()}` } })
    .then(res => res.data)
    .catch(err => err.response.data);

const deleteLibraryItems = id =>
  API.delete(`library/${id}`, { headers: { Authorization: `Bearer ${getToken()}` } })
    .then(res => res.data)
    .catch(err => err.response.data);

const updateItem = (id, item) => {
  const {
    categoryTag, type, title, description, url,
  } = item;
  return API.put(
    `library/edit/${id}`,
    {
      categoryTag,
      type,
      title,
      description,
      url,
    },
    { headers: { Authorization: `Bearer ${getToken()}` } },
  )
    .then(res => res.data)
    .catch(err => err.response.data);
};

const getItemById = id => API.get(`library/${id}`).then(response => response.data);

export {
  getLibraryCategories,
  addLibraryItem,
  getLibraryItems,
  getPendingItems,
  acceptPendingItems,
  deleteLibraryItems,
  updateItem,
  getItemById,
  fullTextLibrarySearch,
};
