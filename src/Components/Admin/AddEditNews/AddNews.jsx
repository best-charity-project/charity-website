import React from 'react';
import Form from '../Form/Form';
import { addNews } from '../../../newsCalls';
import Message from '../../Message/Message';
import './AddEditNews.css';

class AddNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        type: '',
        text: '',
      },
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formData) {
    addNews(formData).then((data) => {
      let message = {};
      if (data.error) {
        message = { type: 'error', text: data.error };
        this.setState({ message });
      } else {
        message = { type: 'success', text: data.message };
        this.setState({ message });
      }
    });
  }

  render() {
    return (
      <div className='admin-form-news'>
        <h1 className='secondary-heading'>Добавление новости</h1>
        <Message {...this.state.message} />
        <Form onSubmit={this.handleFormSubmit} buttonText='Добавить новость' />
      </div>
    );
  }
}

export default AddNews;
