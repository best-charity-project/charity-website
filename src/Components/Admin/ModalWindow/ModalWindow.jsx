import React from 'react';
import PropTypes from 'prop-types';
import './ModalWindow.css';

const Modal = props => (
  <div className='modal'>
    <div className='modal--window'>
      <p className='modal-window--question'>Хотите удалить новость?</p>
      <button className='control-button control-button--red' onClick={props.onConfirm}>
        Удалить
      </button>
      <button className='control-button control-button--green' onClick={props.toggle}>
        Отмена
      </button>
    </div>
  </div>
);

Modal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
};
export default Modal;
