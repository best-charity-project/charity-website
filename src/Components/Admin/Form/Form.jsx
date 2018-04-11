import React from 'react';
import PropTypes from 'prop-types';
import Time from './Time';
import InputField from '../../FormFields/InputField';
import TextareaField from '../../FormFields/TextareaField';
import '../../Form/Form.css';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      newsText: '',
      url: '',
    };
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeNewsText = this.handleChangeNewsText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeUrl = this.handleChangeUrl.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { title, newsText, url } = nextProps.news;
    this.setState({
      title,
      newsText,
      url,
    });
  }

  handleChangeTitle(title) {
    this.setState({
      title,
    });
  }

  handleChangeNewsText(newsText) {
    this.setState({
      newsText,
    });
  }

  handleChangeUrl(url) {
    this.setState({
      url,
    });
  }

  clearFields() {
    this.setState({
      title: '',
      newsText: '',
      url: '',
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title, newsText, url } = this.state;
    this.props.onSubmit({
      title,
      newsText,
      url,
    });
    this.clearFields();
  }

  render() {
    return (
      <div className='add-news form'>
        <Time />
        <form name='addNews' onSubmit={this.handleSubmit}>
          <InputField
            id='news-heading'
            type='text'
            label='Заглавие:'
            value={this.state.title}
            onChange={this.handleChangeTitle}
            placeholder='Заголовок'
            required='required'
          />
          <TextareaField
            id='news-text'
            type='text'
            label='Текст новости(краткое описание):'
            value={this.state.newsText}
            onChange={this.handleChangeNewsText}
            placeholder='Текст новости'
            required='required'
          />
          <InputField
            id='news-url'
            type='url'
            label='Ссылка на новость:'
            value={this.state.url}
            onChange={this.handleChangeUrl}
            placeholder='https://.....'
          />
          <br />
          <input
            type='submit'
            className='control-button control-button-primary'
            value={this.props.buttonText}
          />
        </form>
      </div>
    );
  }
}

Form.defaultProps = {
  news: {
    title: '',
    newsText: '',
    url: '',
  },
};

Form.propTypes = {
  news: PropTypes.shape({
    title: PropTypes.string,
    newsText: PropTypes.string,
    url: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};
