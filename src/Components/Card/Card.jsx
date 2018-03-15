import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ heading, text, path }) => (
  <div className='card'>
    <h2 className='card--heading'>{heading}</h2>
    <p className='card--text'>
      {text}
    </p>
    <Link to={path} className='card--link'>Перейти</Link>
  </div>
);

export default Card;

Card.propTypes = {
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};