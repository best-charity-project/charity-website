import React from 'react';
import PropTypes from 'prop-types';
import deleteIcon from '../../img/delete.svg';
import './Category.css';

const Category = (props) => {
  function onDelete() {
    props.onDelete(props._id);
  }
  return (
    <li className='oneCategory'>
      <div className='oneCategory--title'>{props.title}</div>
      <button onClick={onDelete} className='oneCategory--image'>
        <img src={deleteIcon} alt='delete-icon' />
      </button>
    </li>
  );
};

export default Category;

Category.propTypes = {
  onDelete: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
