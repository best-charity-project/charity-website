import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({
  heading, text, path, linkText, classNameLink, target, classNameCard,
}) =>
  (
    <div className={`card ${classNameCard}`}>
      <h2 className='card--heading'>
        {heading}
      </h2>
      <p className='card--text'>
        {text}
      </p>
      <Link
        to={path}
        className={classNameLink}
        target={target}
        rel='noopener noreferrer'
      >
        {linkText}
      </Link>
    </div>
  );

export default Card;

Card.defaultProps = {
  target: '',
  classNameCard: '',
};

Card.propTypes = {
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  target: PropTypes.string,
  classNameLink: PropTypes.string.isRequired,
  classNameCard: PropTypes.string,
};
