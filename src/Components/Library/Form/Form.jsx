import React from 'react';
import './Form.css';
import { getLibraryCategories, addLibraryItem } from '../../../libraryCalls';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      category_tag: 'nothing',
      type: 'literature',
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
    this.setState({ category_tag: event.target.value });
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

  handleSubmit() {
    const {
      category_tag, type, title, description, url,
    } = this.state;
    addLibraryItem({
      category_tag,
      type,
      title,
      description,
      url,
    });
  }

  render() {
    return (
      <div>
        <h2>Добавить информацию</h2>
        <form name='addCategory' onSubmit={this.handleSubmit} >
          <label htmlFor='addCategory'>
            Выбор категории
        <p>
              <select className='form-library--field' onChange={this.handleChangeCategory}>
                <option value=''>---</option>
                {this.state.categories.map(item => (
                  <option value={item.tag} key={item._id}>{item.title}</option>
                ))}
              </select>
            </p>
          </label>
          <label htmlFor='addCategory'>
            Выбор типа материала
        <p>
              <select className='form-library--field' onChange={this.handleChangeType}>
                <option value='literature'>Литература</option>
                <option value='video'>Видео</option>
                <option value='articles'>Статьи</option>
                <option value='study_material'>Учебные материалы</option>
              </select>
            </p>
          </label>
          <label htmlFor='addCategory'>
            Название документа
        <p>
              <input
                type='text'
                placeholder='Название'
                className='form-library--field'
                onChange={this.handleChangeTitle} />
            </p>
          </label>
          <label htmlFor='addCategory'>
            Краткое описание
        <p>
              <textarea
                type='text'
                placeholder='Описание документа'
                className='form-library--field'
                onChange={this.handleChangeDescription} />
            </p>
          </label>
          <label htmlFor='addCategory'>
            Ссылка на источник
        <p>
              <input
                type='url'
                placeholder='https://....'
                className='form-library--field'
                onChange={this.handleChangeUrl} />
            </p>
          </label>
          <input type='submit' value='Добавить' className='form-library--button' />
        </form>
      </div>
    );
  }
}

export default Form;
