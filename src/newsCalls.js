import API from './api';

let newsCache;

const getNews = () => {
  if (!newsCache) {
    return API.get('news').then((response) => {
      newsCache = response.data;
      return response.data;
    });
  }
  return Promise.resolve(newsCache);
};

const addNews = news =>
  API.post('news', news)
    .then(res => res.data)
    .catch(err => err.response.data);

const updateNews = (id, news) => {
  const {
    title, newsText, url, date,
  } = news;
  API.put(`news/${id}`, {
    title,
    newsText,
    url,
    date,
  });
};

const getNewsById = id => API.get(`news/${id}`).then(response => response.data);

const deleteNews = (id) => {
  API.delete(`news/${id}`);
};

export { getNews, addNews, updateNews, getNewsById, deleteNews };
