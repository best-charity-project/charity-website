import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../InputField/InputField';
import { minPasswordLength } from '../../../configs/config.json';
import './AddCategoryForm.css';

export default class AddCategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      tag: '',
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value,
    });
  }

  handleTagChange(event) {
    this.setState({
      tag: event.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { title, tag } = this.state;
    this.props.onSubmit({ title, tag });
  }

  render() {
    return (
      <div className='add-category-form'>
        <h2 className='add-category-form--heading'>Добавление категории:</h2>
        <form
          name='AddCategoryForm'
          className='add-category-form--form'
          onSubmit={this.handleSubmit}
        >
          <InputField
            id='categoryName'
            type='text'
            value={this.state.title}
            onChange={this.handleTitleChange}
            labelText='Название'
            required='required'
          />
          <InputField
            id='categoryTag'
            type='text'
            pattern='^[a-zA-Z]+$'
            value={this.state.tag}
            onChange={this.handleTagChange}
            labelText='Тэг (латиницей)'
            minLength={minPasswordLength}
            required='required'
          />
          <input
            type='submit'
            className='control-button control-button-primary '
            value={this.props.buttonText}
          />
        </form>
      </div>
    );
  }
}

AddCategoryForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};
