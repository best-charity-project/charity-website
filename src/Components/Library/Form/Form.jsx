import React from 'react';
import './Form.css';
import { getLibraryCategories, addLibraryItem } from '../../../libraryCalls';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      categoryTag: '',
      type: '',
      title: '',
      description: '',
      url: '',
    };
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeUrl = this.handleChangeUrl.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setCategories();
  }

  setCategories() {
    getLibraryCategories().then(categories => this.setState({ categories }));
  }

  handleChangeCategory(event) {
    this.setState({ categoryTag: event.target.value });
  }

  handleChangeType(event) {
    this.setState({ type: event.target.value });
  }

  handleChangeDescription(event) {
    this.setState({ description: event.target.value });
  }

  handleChangeTitle(event) {
    this.setState({ title: event.target.value });
  }

  handleChangeUrl(event) {
    this.setState({ url: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      categoryTag, type, title, description, url,
    } = this.state;
    addLibraryItem({
      categoryTag,
      type,
      title,
      description,
      url,
    });
  }

  render() {
    return (
      <div className='form-library'>
        <h2 className='form-library--heading'>Добавить информацию</h2>
        <form name='addCategory' onSubmit={this.handleSubmit} >
          <label htmlFor='category'>Выбор категории</label>
          <select
            id='category'
            className='form-library--field'
            onChange={this.handleChangeCategory}
            required
          >
            <option value='' disabled selected>---</option>
            {this.state.categories.map(item => (
              <option value={item.tag} key={item._id}>{item.title}</option>
            ))}
          </select>
          <label htmlFor='type'>Выбор типа материала</label>
          <select
            id='type'
            className='form-library--field'
            onChange={this.handleChangeType}
            required
          >
            <option value='' disabled selected>---</option>
            <option value='literature'>Литература</option>
            <option value='video'>Видео</option>
            <option value='articles'>Статьи</option>
            <option value='study_material'>Учебные материалы</option>
          </select>
          <label htmlFor='title'>Название документа</label>
          <input
            id='title'
            type='text'
            placeholder='Название'
            className='form-library--field'
            onChange={this.handleChangeTitle}
            required
          />
          <label htmlFor='descripton'>Краткое описание</label>
          <textarea
            id='description'
            type='text'
            placeholder='Описание документа'
            className='form-library--field'
            onChange={this.handleChangeDescription}
            required
          />
          <label htmlFor='url'> Ссылка на источник</label>
          <input
            id='url'
            type='url'
            placeholder='https://....'
            className='form-library--field'
            onChange={this.handleChangeUrl}
            required
          />
          <input type='submit' value='Добавить' className='form-library--button' />
        </form>
      </div>
    );
  }
}

export default Form;
