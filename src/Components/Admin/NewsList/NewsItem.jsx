import React from 'react';
import PropTypes from 'prop-types';

class NewsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id, // eslint-disable-line
    };
    this.deleteHandler = this.deleteHandler.bind(this);
  }
  deleteHandler() {
    this.props.onDelete(this.state.id); // eslint-disable-line
  }
  render() {
    return (
      <div className={this.props.className}>
        <h2 className='single-news--title'>{this.props.title}</h2>
        <p className='single-news--text'>{this.props.shortDescription}</p>
        <button className='form--button news-admin--button' onClick={this.deleteHandler}>
          Удалить
        </button>
      </div>
    );
  }
}

NewsItem.propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
};

export default NewsItem;
