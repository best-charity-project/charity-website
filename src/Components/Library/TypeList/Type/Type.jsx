import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Type.css';

const Type = ({ category, type, text }) => (
  <Link className='type-list--link' to={`/library/${category}/${type}`}>
    {text}
  </Link>
);

export default Type;

Type.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
