import React from 'react';
import TypeList from '../TypeList/TypeList';
import './Category.css';

class Category extends React.Component {
  constructor() {
    super();
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
          Категория
        </button>
        {this.state.isDisplayed && <TypeList />}
      </div>
    );
  }
}

export default Category;
