import React from 'react';
import Time from '../Time/Time';
import './Admin.css';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      shortDescription: '',
      newsText: '',
    };
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeNewsText = this.handleChangeNewsText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  handleChangeNewsText(event) {
    this.setState({
      newsText: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  render() {
    return (
      <div className='admin'>
        <div className='form--add-news'>
          <h1 className='form--heading'>Добавление новости</h1>
          <p className='form--current-date'>
            Текущая дата: <Time />{' '}
          </p>
          <form onSubmit={this.handleSubmit} className='form--form'>
            <label>
              <p className='form--label'>Заглавие:</p>
              <input
                value={this.state.title}
                onChange={this.handleChangeTitle}
                type='text'
                className='form--short-description'
                placeholder='Type heading here'
              />
            </label>
            <label>
              <p className='form--label'>Краткое описание:</p>
              <input
                value={this.state.shortDescription}
                onChange={this.handleChangeDescription}
                type='text'
                className='form--short-description'
                placeholder='Short description'
              />
            </label>
            <label>
              <p className='form--label'>Текст новости:</p>
              <textarea
                value={this.state.newsText}
                onChange={this.handleChangeNewsText}
                className='form--textarea'
                placeholder='Type your news here'
                rows='10'
                cols='100'
              />
            </label>
            <br />
            <button className='form--button'>Добавить новость</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Admin;
