import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteLibraryItems } from '../../../libraryCalls';
import checkMessageType from '../checkMessageType';
import Message from '../../Message/Message';
import ControlButton from '../../ControlButton/ControlButton';
import Modal from '../ModalWindow/ModalWindow';

class AdminLibraryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      message: {
        type: '',
        text: '',
      },
    };
    this.handleEditClick = this.handleEditClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  handleEditClick() {
    this.props.history.push(`${this.props.match.url}/edit/${this.props._id}`);
  }

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  deleteItem() {
    deleteLibraryItems(this.props._id).then((data) => {
      this.setState({ message: checkMessageType(data) });
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
            text='Редактировать'
            onButtonClick={this.handleEditClick}
            className='control-button control-button--green control-button--small'
          />
          <ControlButton
            text='Удалить'
            onButtonClick={this.toggleModal}
            className='control-button control-button--red control-button--small'
          />
          {this.state.isOpen && <Modal onConfirm={this.deleteItem} toggle={this.toggleModal} />}
        </div>
      </div>
    );
  }
}

export default withRouter(AdminLibraryItem);

AdminLibraryItem.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
