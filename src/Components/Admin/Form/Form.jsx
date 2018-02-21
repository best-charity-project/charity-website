import React from 'react';
import PropTypes from 'prop-types';
import { updateNews } from '../../../newsCalls';
import Time from './Time';
import './Form.css';
import ControlButton from '../../ControlButton/ControlButton';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      shortDescription: '',
      url: '',
      showSaveButton: false,
    };
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeUrl = this.handleChangeUrl.bind(this);
    this.handleUpdateNews = this.handleUpdateNews.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.title,
      shortDescription: nextProps.shortDescription,
      url: nextProps.url,
      id: nextProps.id,
      showSaveButton: nextProps.showSaveButton,
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
    const newDate = new Date();
    const date = `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`;
    const { title, shortDescription, url } = this.state;
    this.props.onNewsSubmit({
      title,
      shortDescription,
      url,
      date,
    });
    this.clearFields();
  }

  handleUpdateNews() {
    const newDate = new Date();
    const date = `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`;
    const {
      id, title, shortDescription, url,
    } = this.state;

    updateNews({
      id,
      title,
      shortDescription,
      url,
      date,
    });
    this.clearFields();
  }

  render() {
    return (
      <div className='form--add-news'>
        <h1 className='form--heading'>Добавление новости</h1>
        <Time />
        <form name='addNews' onSubmit={this.handleSubmit} className='form--form'>
          <label htmlFor='addNews'>
            <p className='form--label'>Заглавие:</p>
            <input
              value={this.state.title}
              onChange={this.handleChangeTitle}
              type='text'
              className='form--input'
              placeholder='Type heading here'
              required
            />
          </label>
          <label htmlFor='addNews'>
            <p className='form--label'>Краткое описание:</p>
            <textarea
              value={this.state.shortDescription}
              onChange={this.handleChangeDescription}
              type='text'
              className='form--textarea'
              placeholder='Short description'
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
              placeholder='url'
              required
            />
          </label>
          <br />
          {!this.state.showSaveButton && (
            <input type='submit' className='form--button' value='Добавить новость' />
          )}
        </form>
        {this.state.showSaveButton && (
          <ControlButton text='Сохранить' onButtonClick={this.handleUpdateNews} />
        )}
      </div>
    );
  }
}

Form.propTypes = {
  id: PropTypes.string.isRequired,
  onNewsSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  showSaveButton: PropTypes.bool.isRequired,
};
