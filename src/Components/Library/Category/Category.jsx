import React from 'react';
import ElementDataTypeList from '../ElementDataTypeList/ElementDataTypeList';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
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
      <div className='category'>
        <h1 role='button' className='category-element' onClick={this.changeState}>
          Категория
        </h1>
        {this.state.display && <ElementDataTypeList />}
      </div>
    );
  }
}

export default Category;
