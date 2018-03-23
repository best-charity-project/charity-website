import React from 'react';
import PropTypes from 'prop-types';

const detailsButton = ({ url, text, className }) => (
  <a className={className} href={url} target='_blank' rel='noopener noreferrer'>
    {text}
  </a>
);

detailsButton.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default detailsButton;
