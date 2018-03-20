import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Time from './Time';
import './Form.css';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      shortDescription: '',
      url: '',
      isHidden: true,
    };
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeUrl = this.handleChangeUrl.bind(this);
    this.toggleClass = this.toggleClass.bind(this);
    this.getImageClass = this.getImageClass.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { title, shortDescription, url } = nextProps.news;
    this.setState({
      title,
      shortDescription,
      url,
    });
  }

  getImageClass() {
    return classnames('form--input', {
      'input-hidden': this.state.isHidden,
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

  toggleClass() {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  render() {
    return (
      <div className='form--add-news'>
        <Time />
        <form name='addNews' onSubmit={this.handleSubmit} className='form--form'>
          <p className='add-news--checkbox-text'>
            <input type='checkbox' onClick={this.toggleClass} /> Новость со ссылкой на сторонний
            ресурс
          </p>
          <input
            value={this.state.url}
            onChange={this.handleChangeUrl}
            type='url'
            className={this.getImageClass()}
            placeholder='Ссылка на новость https://....'
          />
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
