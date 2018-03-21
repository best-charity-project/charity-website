import React from 'react';
import PropTypes from 'prop-types';
import Time from './Time';
import './Form.css';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      shortDescription: '',
      url: '',
    };
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeUrl = this.handleChangeUrl.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { title, shortDescription, url } = nextProps.news;
    this.setState({
      title,
      shortDescription,
      url,
    });
  }

  handleChangeTitle(event) {
    this.setState({
      title: event.target.value,
    });
  }

  handleChangeDescription(event) {
    this.setState({
      shortDescription: event.target.value,
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
      shortDescription: '',
      url: '',
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title, shortDescription, url } = this.state;
    this.props.onSubmit({
      title,
      shortDescription,
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
              value={this.state.shortDescription}
              onChange={this.handleChangeDescription}
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
    shortDescription: '',
    url: '',
  },
};

Form.propTypes = {
  news: PropTypes.shape({
    title: PropTypes.string,
    shortDescription: PropTypes.string,
    url: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};
