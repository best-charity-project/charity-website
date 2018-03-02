import React from 'react';
import { getLibraryCategories } from '../../../libraryCalls';
import Category from '../Category/Category';
import './CategoriesList.css';

class CategoriesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }
  componentDidMount() {
    this.setCategories();
  }
  setCategories() {
    getLibraryCategories().then(categories => this.setState({ categories }));
  }
  render() {
    return (
      <div>
        <h2 className='categories-list--heading'>Список категорий: </h2>
        <ul className='categories-list'>
          {this.state.categories.map(category => (
            <li className='categories-list--element' key={category._id}>
              <Category title={category.title} tagOfCategory={category.tag} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default CategoriesList;
