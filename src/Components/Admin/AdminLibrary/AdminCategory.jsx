import React from 'react';
import PropTypes from 'prop-types';
import deleteIcon from '../../img/delete.svg';
import checkIcon from '../../img/check.svg';
import './AdminCategory.css';

export default class AdminCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryTitle: this.props.category.title,
      hasValueChanged: false,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleDelete() {
    this.props.onDelete(this.props.category);
  }

  handleSave() {
    this.props.onSave(this.props.category._id, this.state.categoryTitle);
    this.setState({ hasValueChanged: false });
  }

  handleValueChange(event) {
    this.setState({ categoryTitle: event.target.value, hasValueChanged: true });
  }

  render() {
    return (
      <li className='adminCategory'>
        <input
          type='text'
          value={this.state.categoryTitle}
          className='adminCategory--title'
          onChange={this.handleValueChange}
        />
        <div className='adminCategory--controls'>
          {this.state.hasValueChanged && (
            <button onClick={this.handleSave} className='adminCategory--image'>
              <img src={checkIcon} alt='edit-icon' />
            </button>
          )}
          <button onClick={this.handleDelete} className='adminCategory--image'>
            <img src={deleteIcon} alt='delete-icon' />
          </button>
        </div>
      </li>
    );
  }
}

AdminCategory.propTypes = {
  onDelete: PropTypes.func.isRequired,
  category: PropTypes.shape({
    tag: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};
