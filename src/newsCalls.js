import API from './api';

let newsCache;

const getNews = () => {
  if (!newsCache) {
    return API.get('news')
      .then((response) => {
        newsCache = response.data;
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }
  return Promise.resolve(newsCache);
};

const addNews = (news) => {
  API.post('news', news).catch((err) => {
    throw err;
  });
};

const deleteNews = (id) => {
  API.delete(`news/${id}`);
};
export { getNews, addNews, deleteNews };
