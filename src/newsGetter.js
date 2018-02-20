import API from './api';

let news = 0;

const NewsGetter = {
  getNews: () => {
    if (news === 0) {
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
