import API from './api';

let libraryCache;
const getLibraryCategories = () => {
  if (libraryCache) {
    return Promise.resolve(libraryCache);
  }
  return API.get('/Library/categories')
    .then((response) => {
      libraryCache = response.data;
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
export default getLibraryCategories;
