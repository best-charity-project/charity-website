import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TypeList from '../TypeList/TypeList';
import './Category.css';

export default class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
    this.changeState = this.changeState.bind(this);
  }

  getLibraryClass() {
    return classnames('category--item', {
      open: this.state.isActive,
    });
  }

  setActiveToFalse() {
    this.setState({ isActive: false });
  }

  changeState(event) {
    event.preventDefault();
    this.setState({ isActive: !this.state.isActive });
  }

  render() {
    return (
      <div className='category'>
        <button className={this.getLibraryClass()} onClick={this.changeState}>
          <div className='category-arrow' />
          <div className='category-title'>{this.props.title}</div>
        </button>
        {<TypeList categoryTag={this.props.tagOfCategory} onClick={this.setActiveToFalse} />}
      </div>
    );
  }
}
Category.propTypes = {
  title: PropTypes.string.isRequired,
  tagOfCategory: PropTypes.string.isRequired,
};
