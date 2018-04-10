import API from './api';
import appendAuthorizationHeaders from './appendAuthorizationHeaders';

const authHeader = appendAuthorizationHeaders();

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

const addNews = news => API.post('news', news, { headers: authHeader }).then(res => res.data);

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
    { headers: authHeader },
  ).then(res => res.data);
};

const getNewsById = id => API.get(`news/${id}`).then(response => response.data);

const deleteNews = id => API.delete(`news/${id}`, { headers: authHeader }).then(res => res.data);

export { getNews, addNews, updateNews, getNewsById, deleteNews };
