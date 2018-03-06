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

const addNews = news => API.post('news', news);

const updateNews = (id, news) => {
  const {
    title, shortDescription, url, date,
  } = news;
  API.put(`news/${id}`, {
    title,
    shortDescription,
    url,
    date,
  });
};

const getNewsById = id => API.get(`news/?_id=${id}`).then(response => response.data[0]);

const deleteNews = (id) => {
  API.delete(`news/${id}`);
};

export { getNews, addNews, updateNews, getNewsById, deleteNews };
