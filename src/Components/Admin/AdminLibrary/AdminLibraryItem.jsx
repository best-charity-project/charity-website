import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ControlButton from '../../ControlButton/ControlButton';

class AdminLibraryItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleEditClick() {
    this.props.history.push(`${this.props.match.url}/edit/${this.props._id}`);
  }
  render() {
    return (
      <div className='library-items--single-item'>
        <a href={this.props.url} className='single-item--link'>
          <h2>{this.props.title}</h2>
        </a>
        <p className='single-item--text'>{this.props.description}</p>
        <div className='item--buttons'>
          <ControlButton
            text='Редактировать'
            onButtonClick={this.handleEditClick}
            className='control-button control-button--green control-button--small'
          />
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
