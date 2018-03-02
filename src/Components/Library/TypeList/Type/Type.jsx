import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Type = ({ category, type, text }) => (
  <Link to={`/Library/categories/${category}/libraryItems/${type}`}>{text}</Link>
);

export default Type;

Type.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
