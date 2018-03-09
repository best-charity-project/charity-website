import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Type.css';

const Type = ({
  categoryTag, typeTag, text, match,
}) => (
  <Link className='type-list--link' to={`${match.url}/${categoryTag}/${typeTag}`}>
    {text}
  </Link>
);

export default Type;

Type.propTypes = {
  categoryTag: PropTypes.string.isRequired,
  typeTag: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
