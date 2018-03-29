import React from 'react';
import PropTypes from 'prop-types';
import Form from '../Form/Form';
import { updateNews, getNewsById } from '../../../newsCalls';
import checkMessageType from '../checkMessageType';
import Message from '../../Message/Message';
import './AddEditNews.css';

class EditNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsToEdit: null,
      message: {
        type: '',
        text: '',
      },
    };
    this.handleNewsUpdate = this.handleNewsUpdate.bind(this);
  }

  componentDidMount() {
    this.getNews();
  }

  getNews() {
    const { id } = this.props.match.params;
    getNewsById(id).then((news) => {
      this.setState({ newsToEdit: news });
    });
  }

  handleNewsUpdate(news) {
    updateNews(this.props.match.params.id, news).then((data) => {
      this.setState({ message: checkMessageType(data) });
    });
  }

  render() {
    return (
      <div className='admin-form-news'>
        <h1 className='secondary-heading'>Редактирование новости</h1>
        <Message {...this.state.message} />
        <Form
          news={this.state.newsToEdit}
          onSubmit={this.handleNewsUpdate}
          buttonText='Сохранить новость'
        />
      </div>
    );
  }
}

export default EditNews;

EditNews.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
