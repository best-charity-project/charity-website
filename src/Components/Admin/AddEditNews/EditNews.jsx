import React from 'react';
import PropTypes from 'prop-types';
import Form from '../Form/Form';
import { updateNews, getNewsById } from '../../../newsCalls';
import './AddEditNews.css';

class EditNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsToEdit: null,
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
    updateNews(this.props.match.params.id, news);
  }

  render() {
    return (
      <div className='add-edit-news'>
        <h1 className='add-edit-news--heading'>Редактирование новости</h1>
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
