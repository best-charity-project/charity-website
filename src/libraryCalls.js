import API from './api';
import appendAuthorizationHeaders from './appendAuthorizationHeaders';
import generateURLQuery from './utils/generateURLQuery';

const libraryPath = 'library';

const getLibraryItems = (categoryTag, type) => {
  const path = generateURLQuery(`${libraryPath}`, { categoryTag, type });
  return API.get(path).then(response => response.data);
};

const getLibraryItemsAmount = (query) => {
  const path = generateURLQuery(`${libraryPath}/count`, query);
  return API.get(path).then(response => response.data);
};

const getLibraryCategories = () => API.get('categories').then(response => response.data);

const addCategory = category =>
  API.post('categories', category, { headers: appendAuthorizationHeaders() }).then(res => res.data);

const deleteCategory = id =>
  API.delete(`categories/${id}`, { headers: appendAuthorizationHeaders() }).then(res => res.data);

const addLibraryItem = libraryItem =>
  API.post(libraryPath, libraryItem, { headers: appendAuthorizationHeaders() })
    .then(res => res.data);

const fullTextLibrarySearch = (textSearch, checkedTypes) => {
  const path = generateURLQuery(`${libraryPath}/search`, { textSearch, types: checkedTypes });
  return API.get(path).then(response => response.data);
};

const getPendingItems = () => API.get(`${libraryPath}/pending`).then(response => response.data);

const acceptPendingItems = id =>
  API.put(`${libraryPath}/${id}`, {}, { headers: appendAuthorizationHeaders() }).then(res => res.data);

const deleteLibraryItems = id =>
  API.delete(`${libraryPath}/${id}`, { headers: appendAuthorizationHeaders() }).then(res => res.data);

const updateItem = (id, item) => {
  const {
    categoryTag, type, title, description, url,
  } = item;
  return API.put(
    `${libraryPath}/edit/${id}`,
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

const getItemById = id => API.get(`${libraryPath}/${id}`).then(response => response.data);

const moveItems = (from, to) =>
  API.put(`${libraryPath}/move`, { from, to }, { headers: appendAuthorizationHeaders() }).then(res => res.data);

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
  addCategory,
  deleteCategory,
  moveItems,
};
