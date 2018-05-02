import React from 'react';
import PropTypes from 'prop-types';
import { deleteOrganization } from '../../../organizationsCalls';
import Organization from '../../Organizations/Organization';
import Message from '../../Message/Message';
import ControlButton from '../../ControlButton/ControlButton';
import Modal from '../ModalWindow/ModalWindow';

class AcceptedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      message: {
        type: '',
        text: '',
      },
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.rejectOrganization = this.rejectOrganization.bind(this);
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

export default AcceptedItem;

AcceptedItem.propTypes = {
  _id: PropTypes.string.isRequired,
};