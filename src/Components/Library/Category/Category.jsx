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

  changeState(event) {
    event.preventDefault();
    this.setState({ isActive: !this.state.isActive });
  }

  render() {
    return (
      <div className='category'>
        <button className={this.getLibraryClass()} onClick={this.changeState}>
          <div className='category--title'>
            <span>{this.props.title}</span>
          </div>
        </button>
        {<TypeList match={this.props.match} categoryTag={this.props.categoryTag} />}
      </div>
    );
  }
}

Category.propTypes = {
  title: PropTypes.string.isRequired,
  categoryTag: PropTypes.string.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
