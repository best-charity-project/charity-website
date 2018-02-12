import React from 'react';
import Time from '../../Time/Time';
import './Form.css';

class Form extends React.Component {
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
  handlerChangeUrl(event) {
    this.setState({
      url: event.target.value,
    });
  }

  handleSubmit() {
    this.event.preventDefault();
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
            />
          </label>
          <label htmlFor='addNews'>
            <p className='form--label'>Ссылка на новость:</p>
            <input
              value={this.state.url}
              onChange={this.handleChangeUrl}
              type='text'
              className='form--input'
              placeholder='url'
            />
          </label>
          <br />
          <button className='form--button'>Добавить новость</button>
        </form>
      </div>
    );
  }
}
export default Form;
