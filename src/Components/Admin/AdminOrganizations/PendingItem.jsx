import React from 'react';
import PropTypes from 'prop-types';
import { acceptPendingOrganizations, deleteOrganization } from '../../../organizationsCalls';
import Message from '../../Message/Message';
import Organization from '../../Organizations/Organization';
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
    this.acceptOrganization = this.acceptOrganization.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.rejectOrganization = this.rejectOrganization.bind(this);
  }

  acceptOrganization() {
    acceptPendingOrganizations(this.props._id)
      .then((data) => {
        this.setState({ message: { type: 'success', text: data.message } });
      })
      .catch((err) => {
        this.setState({ message: { type: 'error', text: err.response.data.message } });
      });
  }

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  rejectOrganization() {
    deleteOrganization(this.props._id)
      .then((data) => {
        this.setState({ message: { type: 'success', text: data.message } });
      })
      .catch((err) => {
        this.setState({ message: { type: 'error', text: err.response.data.message } });
      });
    this.toggleModal();
  }

  render() {
    return (
      <div className='admin-organizations--organization'>
        <Organization {...this.props} />
        <Message {...this.state.message} />
        <div className='item--buttons'>
          <ControlButton
            text='Одобрить заявку'
            onButtonClick={this.acceptOrganization}
            className='control-button control-button-secondary control-button-small'
          />
          <ControlButton
            text='Удалить'
            onButtonClick={this.toggleModal}
            className='control-button control-button-warning control-button-small'
          />
          {this.state.isOpen && (
            <Modal onConfirm={this.rejectOrganization} toggle={this.toggleModal} />
          )}
        </div>
      </div>
    );
  }
}

export default PendingItem;

PendingItem.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  contacts: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
