import React from 'react';
import PropTypes from 'prop-types';

const detailsButton = props => (
  <a className={props.className} href={props.url} target='_blank' rel='noopener noreferrer'>
    {props.text}
  </a>
);

detailsButton.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default detailsButton;
