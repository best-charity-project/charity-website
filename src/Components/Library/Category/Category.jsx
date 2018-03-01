import React from 'react';
import PropTypes from 'prop-types';
import TypeList from '../TypeList/TypeList';
import './Category.css';

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayed: false,
    };
    this.changeState = this.changeState.bind(this);
  }

  changeState(event) {
    event.preventDefault();
    this.setState({ isDisplayed: !this.state.isDisplayed });
  }

  render() {
    return (
      <div className='category'>
        <button className='category--title' onClick={this.changeState}>
          {this.props.title}
        </button>
        {this.state.isDisplayed && <TypeList />}
      </div>
    );
  }
}
Category.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Category;
