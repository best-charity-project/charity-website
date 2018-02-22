import React from 'react';
import PropTypes from 'prop-types';
import './ControlButton.css';

const controlButton = props => (
  <button className='control-button' onClick={props.onButtonClick}>
    {props.text}
  </button>
);

controlButton.propTypes = {
  text: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default controlButton;
