import React from 'react';
import PropTypes from 'prop-types';
import Time from './Time';
import './Form.css';

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

  handleChangeTitle(event) {
    this.setState({
      title: event.target.value,
    });
  }

  handleChangeNewsText(event) {
    this.setState({
      newsText: event.target.value,
    });
  }

  handleChangeUrl(event) {
    this.setState({
      url: event.target.value,
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
      <div className='form--add-news'>
        <Time />
        <form name='addNews' onSubmit={this.handleSubmit} className='form--form'>
          <label htmlFor='addNews'>
            <p className='form--label'>Заглавие:</p>
            <input
              value={this.state.title}
              onChange={this.handleChangeTitle}
              type='text'
              className='form--input'
              placeholder='Заголовок новости'
              required
            />
          </label>
          <label htmlFor='addNews'>
            <p className='form--label'>Текст новости(краткое описание):</p>
            <textarea
              value={this.state.newsText}
              onChange={this.handleChangeNewsText}
              type='text'
              className='form--textarea'
              placeholder='Текст новости'
              required
            />
          </label>
          <label htmlFor='addNews'>
            <p className='form--label'>Ссылка на новость:</p>
            <input
              value={this.state.url}
              onChange={this.handleChangeUrl}
              type='url'
              className='form--input'
              placeholder='https://.....'
            />
          </label>
          <br />
          <input
            type='submit'
            className='control-button control-button--blue'
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
