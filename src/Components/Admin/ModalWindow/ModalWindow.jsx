import React from 'react';
import PropTypes from 'prop-types';
import ControlButton from '../../ControlButton/ControlButton';
import './ModalWindow.css';

const Modal = props => (
  <div className='modal'>
    <div className='modal--window'>
      <p className='modal-window--question'>Вы уверены, что хотите удалить документ?</p>
      <ControlButton
        text='Удалить'
        className='control-button control-button-warning'
        onButtonClick={props.onConfirm}
      />
      <ControlButton
        text='Отмена'
        className='control-button control-button-secondary'
        onButtonClick={props.toggle}
      />
    </div>
  </div>
);

Modal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
};
export default Modal;
