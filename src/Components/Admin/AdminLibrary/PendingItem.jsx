import React from 'react';
import PropTypes from 'prop-types';
import './PendingItem.css';

const PendingItem = props => (
  <div className='library-items--single-item'>
    <a href={props.url} className='single-item--link'>
      <h2>{props.title}</h2>
    </a>
    <p className='single-item--text'>{props.description}</p>
    <div className='item--buttons'>
      <button className='control-button control-button--green control-button--small'>
        Одобрить заявку
      </button>
      <button className='control-button control-button--red control-button--small'>Удалить</button>
    </div>
  </div>
);

export default PendingItem;

PendingItem.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
