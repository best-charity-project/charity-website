import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Admin.css';
import { deleteNews } from '../../newsCalls';
import SingleNews from '../News/SingleNews/SingleNews';
import ControlButton from '../ControlButton/ControlButton';
import DetailsButton from '../DetailsButton/DetailsButton';
import Modal from './ModalWindow/ModalWindow';
import './AdminNewsItem.css';

class AdminNewsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      link: '',
      text: '',
    };
    this.deleteHandler = this.deleteHandler.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.checkUrlHandler = this.checkUrlHandler.bind(this);
  }

  componentDidMount() {
    this.checkUrlHandler();
  }

  checkUrlHandler() {
    if (this.props.url) {
      this.setState({
        link: this.props.url,
        text: 'Перейти',
      });
    } else {
      this.setState({
        link: `/news/${this.props._id}`,
        text: 'Подробнее',
      });
    }
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
      <div className='news-card'>
        <SingleNews {...this.props} />
        <div className='item--buttons'>
          <ControlButton
            text='Редактировать'
            className='control-button control-button--green control-button--small'
            onButtonClick={this.handleEditClick}
          />
          <ControlButton
            text='Удалить'
            className='control-button control-button--red control-button--small'
            onButtonClick={this.toggleModal}
          />
          {this.state.isOpen && <Modal onConfirm={this.deleteHandler} toggle={this.toggleModal} />}
          <DetailsButton
            className='control-button control-button--blue control-button--small'
            url={this.state.link}
            text={this.state.text}
          />
        </div>
      </div>
    );
  }
}
export default withRouter(AdminNewsItem);

AdminNewsItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
