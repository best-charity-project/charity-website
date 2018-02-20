import React from 'react';
import PropTypes from 'prop-types';
import './ControlButton.css';

const controlButton = props => (
  <button className='form--button control-button'>{props.text}</button>
);

controlButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default controlButton;
