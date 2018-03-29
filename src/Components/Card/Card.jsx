import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({
  heading, text, path, url, linkText, classNameLink,
}) => (
  <div className='card'>
    <h2 className='card--heading'>{heading}</h2>
    <p className='card--text'>{text}</p>
    {path ? (
      <Link to={path} className={classNameLink}>
        {linkText}
      </Link>
    ) : (
      <Link to={url} className={classNameLink} target='_blank' rel='noopener noreferrer'>
        {linkText}
      </Link>
    )}
  </div>
);

export default Card;

Card.propTypes = {
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  classNameLink: PropTypes.string.isRequired,
};
