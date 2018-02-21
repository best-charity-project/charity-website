import React from 'react';
import PropTypes from 'prop-types';
import './DetailsButton.css';

const detailsButton = props => (
  <a className='details-button' href={props.url} target='_blank' rel='noopener noreferrer'>
    {props.text}
  </a>
);

detailsButton.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default detailsButton;
