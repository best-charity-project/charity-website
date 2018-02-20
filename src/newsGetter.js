import API from './api';

let news;

const NewsGetter = {
  getNews: () => {
    if (!news) {
      return API.get('news')
        .then((response) => {
          news = response.data;
          return response.data;
        })
        .catch((error) => {
          throw error;
        });
    }
    return Promise.resolve(news);
  },
};

export default NewsGetter;
