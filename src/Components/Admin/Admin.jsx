import React from 'react';
import axios from 'axios';
import Form from './Form/Form';
import './Admin.css';
import NewsList from './NewsList/NewsList';

export default () => {
  // eslint-disable-next-line class-methods-use-this
  function handleNewsSubmit(news) {
    axios.post('https://charity-server.herokuapp.com/api/news', news).catch((err) => {
      throw err;
    });
  }

  return (
    <div className='admin indent'>
      <Form onNewsSubmit={handleNewsSubmit} />
      <NewsList />
    </div>
  );
};
