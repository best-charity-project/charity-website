import React from 'react';
import TypeList from '../TypeList/TypeList';
import './Category.css';

class Category extends React.Component {
  constructor() {
    super();
    this.state = {
      display: false,
    };
    this.changeState = this.changeState.bind(this);
  }
  changeState(event) {
    event.preventDefault();
    this.setState({ display: !this.state.display });
  }
  render() {
    return (
      <div className='category--box'>
        <div
          role='button'
          tabIndex='0'
          className='category-element'
          onKeyDown=''
          onClick={this.changeState}
        >
          Категория
        </div>
        {this.state.display && <TypeList />}
      </div>
    );
  }
}

export default Category;
