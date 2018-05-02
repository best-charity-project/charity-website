import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import AdminCategory from './AdminCategory';
import { getLibraryCategories, deleteCategory, moveItems } from '../../../libraryCalls';
import DeleteCategoryModal from '../../DeleteCategoryModal/DeleteCategoryModal';
import cancelablePromise from '../../../utils/cancelablePromise';
import './CategoriesManagement.css';

class CategoriesManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isOpen: false,
      categoryToDelete: null,
    };
    this.onCategoryDelete = this.onCategoryDelete.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    this.getCategories();
  }

  componentWillUnmount() {
    this.cancelablePromise.cancel();
  }

  onCategoryDelete(category) {
    this.setState({ categoryToDelete: category });
    this.toggleModal();
  }

  onDelete(categoryTitle) {
    if (categoryTitle) {
      const result = this.state.categories.filter(category => category.title === categoryTitle);
      const categoryToMoveItems = result[0];
      moveItems(this.state.categoryToDelete.tag, categoryToMoveItems.tag)
        .then(() => deleteCategory(this.state.categoryToDelete._id))
        .then((data) => {
          this.props.showMessage({ type: 'success', text: data.message });
          this.toggleModal();
          this.getCategories();
        })
        .catch((err) => {
          this.props.showMessage({ type: 'error', text: err.response.data.message });
        });
      return;
    }
    deleteCategory(this.state.categoryToDelete._id)
      .then((data) => {
        this.props.showMessage({ type: 'success', text: data.message });
        this.toggleModal();
        this.getCategories();
      })
      .catch((err) => {
        this.props.showMessage({ type: 'error', text: err.response.data.message });
      });
  }

  getCategories() {
    this.cancelablePromise = cancelablePromise(getLibraryCategories());
    this.cancelablePromise.promise
      .then(categories => this.setState({ categories }))
      .catch((err) => {
        window.console.log(err);
      });
  }

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div className='categories-management'>
        <Link
          to={`${this.props.match.url}/addCategory`}
          className='control-button control-button-tertiary control-button-small'
        >
          Добавить категорию
        </Link>
        <ul className='categories-management--categories'>
          {this.state.categories.map(category => (
            <AdminCategory
              key={category._id}
              onDelete={this.onCategoryDelete}
              category={category}
            />
          ))}
        </ul>
        {this.state.isOpen && (
          <DeleteCategoryModal
            onConfirm={this.onDelete}
            toggle={this.toggleModal}
            category={this.state.categoryToDelete}
            categories={this.state.categories}
          />
        )}
      </div>
    );
  }
}

export default withRouter(CategoriesManagement);

CategoriesManagement.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  showMessage: PropTypes.func.isRequired,
};
