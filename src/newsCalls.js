import API from './api';
import { headers } from './Auth/Auth';

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

const addNews = news => API.post('news', news, { headers }).then(res => res.data);

const updateNews = (id, news) => {
  const {
    title, newsText, url, date,
  } = news;

  return API.put(
    `news/${id}`,
    {
      title,
      newsText,
      url,
      date,
    },
    { headers },
  ).then(res => res.data);
};

const getNewsById = id => API.get(`news/${id}`).then(response => response.data);

const deleteNews = id => API.delete(`news/${id}`, { headers }).then(res => res.data);

export { getNews, addNews, updateNews, getNewsById, deleteNews };
