import React from 'react';
import PropTypes from 'prop-types';
import { acceptPendingItems, rejectPendingItems } from '../../../libraryCalls';
import './PendingItem.css';

class PendingItem extends React.Component {
  constructor(props) {
    super(props);
    this.acceptItems = this.acceptItems.bind(this);
    this.rejectItems = this.rejectItems.bind(this);
  }

  acceptItems() {
    acceptPendingItems(this.props._id);
  }

  rejectItems() {
    rejectPendingItems(this.props._id);
  }

  render() {
    return (
      <div className='library-items--single-item'>
        <a href={this.props.url} className='single-item--link'>
          <h2>{this.props.title}</h2>
        </a>
        <p className='single-item--text'>{this.props.description}</p>
        <div className='item--buttons'>
          <button
            onClick={this.acceptItems}
            className='control-button control-button--green control-button--small'
          >
            Одобрить заявку
          </button>
          <button
            onClick={this.rejectItems}
            className='control-button control-button--red control-button--small'
          >
            Удалить
          </button>
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
