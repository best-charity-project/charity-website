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

const updateNews = (id, news) => {
  const {
    title, shortDescription, url, date,
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

const getNewsByID = id =>
  API.get(`news/${id}`)
    .then(response => response.data)
    .catch((error) => {
      throw error;
    });

export { getNews, addNews, updateNews, getNewsByID };
