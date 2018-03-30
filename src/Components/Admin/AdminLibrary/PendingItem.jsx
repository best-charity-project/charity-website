import React from 'react';
import PropTypes from 'prop-types';
import { acceptPendingItems, deleteLibraryItems } from '../../../libraryCalls';
import checkMessageType from '../checkMessageType';
import Message from '../../Message/Message';
import ControlButton from '../../ControlButton/ControlButton';
import Modal from '../ModalWindow/ModalWindow';
import './PendingItem.css';

class PendingItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      message: {
        type: '',
        text: '',
      },
    };
    this.acceptItem = this.acceptItem.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.rejectItem = this.rejectItem.bind(this);
  }

  acceptItem() {
    acceptPendingItems(this.props._id)
      .then((data) => {
        this.setState({ message: checkMessageType(data, 'success') });
      })
      .catch((err) => {
        this.setState({ message: checkMessageType(err, 'error') });
      });
  }

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  rejectItem() {
    deleteLibraryItems(this.props._id)
      .then((data) => {
        this.setState({ message: checkMessageType(data, 'success') });
      })
      .catch((err) => {
        this.setState({ message: checkMessageType(err, 'error') });
      });
    this.toggleModal();
  }

  render() {
    return (
      <div className='library-items--single-item'>
        <a href={this.props.url} className='single-item--link'>
          <h2>{this.props.title}</h2>
        </a>
        <Message {...this.state.message} />
        <p className='single-item--text'>{this.props.description}</p>
        <div className='item--buttons'>
          <ControlButton
            text='Одобрить заявку'
            onButtonClick={this.acceptItem}
            className='control-button control-button--green control-button--small'
          />
          <ControlButton
            text='Удалить'
            onButtonClick={this.toggleModal}
            className='control-button control-button--red control-button--small'
          />
          {this.state.isOpen && <Modal onConfirm={this.rejectItem} toggle={this.toggleModal} />}
        </div>
      </div>
    );
  }
}

export default PendingItem;

PendingItem.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
