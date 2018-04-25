import React from 'react';
import PropTypes from 'prop-types';
import { getLibraryCategories } from '../../../libraryCalls';
import Category from '../Category/Category';
import cancelablePromise from '../../../utils/cancelablePromise';
import './CategoriesList.css';

export default class CategoriesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.setCategories();
  }

  componentWillUnmount() {
    this.cancelablePromise.cancel();
  }

  setCategories() {
    this.cancelablePromise = cancelablePromise(getLibraryCategories());
    this.cancelablePromise.promise
      .then(categories => this.setState({ categories }))
      .catch((err) => {
        window.console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h2 className='categories-list--heading'>Список категорий: </h2>
        <ul className='categories-list'>
          {this.state.categories.map(category => (
            <li className='categories-list--element' key={category._id}>
              <Category
                match={this.props.match}
                title={category.title}
                categoryTag={category.tag}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

CategoriesList.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
