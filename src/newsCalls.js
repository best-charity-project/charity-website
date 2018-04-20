import API from './api';
import appendAuthorizationHeaders from './appendAuthorizationHeaders';

const getNews = () => API.get('news').then(response => response.data);

const addNews = news =>
  API.post('news', news, { headers: appendAuthorizationHeaders() }).then(res => res.data);

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
    { headers: appendAuthorizationHeaders() },
  ).then(res => res.data);
};

const getNewsById = id => API.get(`news/${id}`).then(response => response.data);

const deleteNews = id =>
  API.delete(`news/${id}`, { headers: appendAuthorizationHeaders() }).then(res => res.data);

export { getNews, addNews, updateNews, getNewsById, deleteNews };
