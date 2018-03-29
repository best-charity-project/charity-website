import API from './api';
import { getToken } from './Auth/Auth';

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
  API.post('news', news, { headers: { Authorization: `Bearer ${getToken()}` } });

const updateNews = (id, news) => {
  const {
    title, newsText, url, date,
  } = news;
  API.put(
    `news/${id}`,
    {
      title,
      newsText,
      url,
      date,
    },
    { headers: { Authorization: `Bearer ${getToken()}` } },
  );
};

const getNewsById = id => API.get(`news/${id}`).then(response => response.data);

const deleteNews = (id) => {
  API.delete(`news/${id}`, { headers: { Authorization: `Bearer ${getToken()}` } });
};

export { getNews, addNews, updateNews, getNewsById, deleteNews };
