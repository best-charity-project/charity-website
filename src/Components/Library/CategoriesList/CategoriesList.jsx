import React from 'react';
import getLibraryCategories from '../../../libraryCalls';
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
      <ul className='categories-list'>
        <span className='categories-list--heading'>Список категорий: </span>
        {this.state.categories.map(item => (
          <li className='categories-list--element'>
            <Category name={item.name} />
          </li>
        ))}
      </ul>
    );
  }
}
export default CategoriesList;
// export default () => (
//   <ul className='categories-list'>
//     <span className='categories-list--heading'>Список категорий: </span>
//     <li className='categories-list--element'>
//       <Category />
//     </li>
//   </ul>
// );
