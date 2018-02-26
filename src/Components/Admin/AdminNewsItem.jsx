import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Admin.css';
import { deleteNews } from '../../newsCalls';
import SingleNews from '../News/SingleNews/SingleNews';
import ControlButton from '../ControlButton/ControlButton';
import DetailsButton from '../DetailsButton/DetailsButton';
import Modal from './ModalWindow/ModalWindow';

class AdminNewsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.deleteHandler = this.deleteHandler.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }
  handleEditClick() {
    this.props.history.push(`${this.props.match.url}/edit/${this.props._id}`);
  }
  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  deleteHandler() {
    deleteNews(this.props._id);
    this.toggleModal();
  }
  render() {
    return (
      <div className='news-list--item'>
        <SingleNews title={this.props.title} shortDescription={this.props.shortDescription} />
        <ControlButton text='Редактировать' onButtonClick={this.handleEditClick} />
        <ControlButton text='Удалить' onButtonClick={this.toggleModal} />
        {this.state.isOpen && <Modal onConfirm={this.deleteHandler} toggle={this.toggleModal} />}
        <DetailsButton text='ПОДРОБНЕЕ' url={this.props.url} />
      </div>
    );
  }
}
export default withRouter(AdminNewsItem);

AdminNewsItem.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
