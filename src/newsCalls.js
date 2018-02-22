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

const updateNews = (news) => {
  const {
    id, title, shortDescription, url, date,
  } = news;
  API.put(`news/${id}`, {
    title,
    shortDescription,
    url,
    date,
  }).catch((err) => {
    throw err;
  });
};

export { getNews, addNews, updateNews };
