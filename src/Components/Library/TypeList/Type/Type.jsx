import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Type.css';

const Type = ({
  categoryTag, typeTag, text, match,
}) => {
  const url = `${match.url}/${categoryTag}/${typeTag}`;
  return (
    <Link className='type-list--link' to={url}>
      {text}
    </Link>
  );
};

export default Type;

Type.propTypes = {
  categoryTag: PropTypes.string.isRequired,
  typeTag: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
