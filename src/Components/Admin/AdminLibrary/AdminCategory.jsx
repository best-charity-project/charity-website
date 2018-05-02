import React from 'react';
import PropTypes from 'prop-types';
import deleteIcon from '../../img/delete.svg';
import './AdminCategory.css';

const AdminCategory = (props) => {
  function onDelete() {
    props.onDelete(props.category);
  }
  return (
    <li className='oneCategory'>
      <div className='oneCategory--title'>{props.category.title}</div>
      <button onClick={onDelete} className='oneCategory--image'>
        <img src={deleteIcon} alt='delete-icon' />
      </button>
    </li>
  );
};

export default AdminCategory;

AdminCategory.propTypes = {
  onDelete: PropTypes.func.isRequired,
  category: PropTypes.shape({
    tag: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
};
