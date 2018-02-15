import React from 'react';
import axios from 'axios';
import Form from './Form/Form';
import './Admin.css';

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewsSubmit = this.handleNewsSubmit.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  handleNewsSubmit(news) {
    axios.post('https://charity-server.herokuapp.com/api/news', news).catch((err) => {
      throw err;
    });
  }

  render() {
    return (
      <div className='admin indent'>
        <Form onNewsSubmit={this.handleNewsSubmit} />
      </div>
    );
  }
}
