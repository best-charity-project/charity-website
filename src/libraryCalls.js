import API from './api';
import appendAuthorizationHeaders from './appendAuthorizationHeaders';

const getLibraryItems = (categoryTag, type) =>
  API.get(`library/?categoryTag=${categoryTag}&type=${type}`).then(response => response.data);

const getLibraryItemsAmount = (categoryTag, type) =>
  API.get(`library/count?categoryTag=${categoryTag}&type=${type}`).then(response => response.data);

const getLibraryCategories = () => API.get('categories').then(response => response.data);

const addLibraryItem = libraryItem =>
  API.post('library', libraryItem, { headers: appendAuthorizationHeaders() }).then(res => res.data);

const fullTextLibrarySearch = (textSearch, checkedTypes) =>
  API.get(`library/search/?textSearch=${textSearch}&types=${checkedTypes}`).then(response => response.data);

const getPendingItems = () => API.get('library/pending').then(response => response.data);

const acceptPendingItems = id =>
  API.put(`library/${id}`, {}, { headers: appendAuthorizationHeaders() }).then(res => res.data);

const deleteLibraryItems = id =>
  API.delete(`library/${id}`, { headers: appendAuthorizationHeaders() }).then(res => res.data);

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
    { headers: appendAuthorizationHeaders() },
  ).then(res => res.data);
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
  getLibraryItemsAmount,
};
