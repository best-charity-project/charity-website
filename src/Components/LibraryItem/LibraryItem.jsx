import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class LibraryItem extends Component {
  state = {
    isOpen: false
  };

  componentDidMount() {
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) this.setState({
        isOpen: false
      });
    });
  };

  getEventWindow = () => {
    this.setState({ isOpen: true });
  };

  closeModalWindow = (e) => {
    if (e.target.className === 'overlay'
      || e.target.classList.contains('button-event-close')
      || e.target.classList.contains('button-close')) {
      e.stopPropagation();
      this.setState({ isOpen: false });
    };
  };

  render() {
    return (
      <div id={this.props.id} className='news'>
        <NavLink to={`/library/${this.props.item._id}`} >
          <p className='news-title'>
            {this.props.item.title}
          </p>
          <span
            className='news-category'>
            {this.props.item.category}
          </span>
          <span
            className='news-text'>
            {this.props.item.description}
          </span>
        </NavLink>
      </div>
    )
  }
}

export default LibraryItem;