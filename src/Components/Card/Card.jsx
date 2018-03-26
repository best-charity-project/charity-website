import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({
  heading,
  text,
  path,
  styles,
  buttonText,
}) =>
  (
    <div className={styles}>
      <h2 className='card--heading'> {heading} </h2>
      <p className='card--text'>{text} </p>
      <Link to={path} className='card--link'>{buttonText}</Link>
    </div>);

export default Card;

Card.propTypes = {
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  styles: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};
