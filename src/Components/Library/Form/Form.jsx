import React from 'react';
import PropTypes from 'prop-types';
import { getLibraryCategories } from '../../../libraryCalls';

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

  componentWillReceiveProps(nextProps) {
    const {
      categoryTag, type, title, description, url,
    } = nextProps.item;
    this.setState({
      categoryTag,
      type,
      title,
      description,
      url,
    });
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
    this.props.onSubmit({
      categoryTag,
      type,
      title,
      description,
      url,
    });
  }

  render() {
    return (
      <div className='form'>
        <form name='addCategory' onSubmit={this.handleSubmit}>
          <p className='form--label'>
            <label htmlFor='category'>Выбор категории</label>
          </p>
          <select
            value={this.state.categoryTag}
            id='category'
            className='form--input input--select'
            onChange={this.handleChangeCategory}
            required
          >
            <option value='' disabled selected>
              ---
            </option>
            {this.state.categories.map(item => (
              <option value={item.tag} key={item._id}>
                {item.title}
              </option>
            ))}
          </select>
          <p className='form--label'>
            <label htmlFor='type'>Выбор типа материала</label>
          </p>
          <select
            value={this.state.type}
            id='type'
            className='form--input input--select'
            onChange={this.handleChangeType}
            required
          >
            <option value='' disabled selected>
              ---
            </option>
            <option value='literature'>Литература</option>
            <option value='video'>Видео</option>
            <option value='article'>Статьи</option>
            <option value='studyMaterial'>Учебные материалы</option>
          </select>
          <p className='form--label'>
            <label htmlFor='title'>Название документа</label>
          </p>
          <input
            value={this.state.title}
            id='title'
            type='text'
            placeholder='Название'
            className='form--input'
            onChange={this.handleChangeTitle}
            required
          />
          <p className='form--label'>
            <label htmlFor='descripton'>Краткое описание</label>
          </p>
          <textarea
            value={this.state.description}
            id='description'
            type='text'
            placeholder='Описание документа'
            className='form--input'
            onChange={this.handleChangeDescription}
            required
          />
          <p className='form--label'>
            <label htmlFor='url'> Ссылка на источник</label>
          </p>
          <input
            value={this.state.url}
            id='url'
            type='url'
            placeholder='https://....'
            className='form--input'
            onChange={this.handleChangeUrl}
            required
          />
          <input
            type='submit'
            value={this.props.buttonText}
            className='form--button control-button control-button--blue'
          />
        </form>
      </div>
    );
  }
}

export default Form;

Form.defaultProps = {
  item: {
    categoryTag: '',
    type: '',
    title: '',
    description: '',
    url: '',
  },
};

Form.propTypes = {
  item: PropTypes.shape({
    categoryTag: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};
