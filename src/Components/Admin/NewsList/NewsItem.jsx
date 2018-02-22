import React from 'react';
import PropTypes from 'prop-types';
import ControlButton from '../../ControlButton/ControlButton';
import Modal from '../ModalWindow/ModalWindow';

class NewsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      isOpen: false,
    };
    this.deleteHandler = this.deleteHandler.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  deleteHandler() {
    this.props.onDelete(this.state.id);
    this.toggleModal();
  }
  render() {
    return (
      <div className={this.props.className}>
        <h2 className='single-news--title'>{this.props.title}</h2>
        <p className='single-news--text'>{this.props.shortDescription}</p>
        <ControlButton text='Удалить' onButtonClick={this.toggleModal} />
        {this.state.isOpen && <Modal onConfirm={this.deleteHandler} toggle={this.toggleModal} />}
      </div>
    );
  }
}

NewsItem.propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NewsItem;
