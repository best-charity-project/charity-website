import API from './api';

let libraryCache;
const getLibraryCategories = () => {
  if (!libraryCache) {
    return API.get('/Library/categories')
      .then((response) => {
        libraryCache = response.data;
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }
  return Promise.resolve(libraryCache);
};
export default getLibraryCategories;
