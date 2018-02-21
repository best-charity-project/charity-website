import React from 'react';
import ElementDataTypeList from '../ElementDataTypeList/ElementDataTypeList';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
class Category extends React.Component {
  constructor() {
    super();
    this.state = {
      Display: false,
    };
    this.changeState = this.changeState.bind(this);
  }
  changeState(event) {
    event.preventDefault();
    this.setState({ Display: !this.state.Display });
  }
  render() {
    return (
      <div className='CategoriesList'>
        <h1 role='button' className='CategoriesList--element' onClick={this.changeState}>
          Категория
        </h1>
        {this.state.Display && <ElementDataTypeList />}
      </div>
    );
  }
}

export default Category;
