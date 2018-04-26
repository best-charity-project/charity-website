import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Category from './Category';
import Modal from '../ModalWindow/ModalWindow';
import { getLibraryCategories, deleteCategory } from '../../../libraryCalls';
import './CategoriesManagement.css';

class CategoriesManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isOpen: false,
      categoryIdToDelete: '',
    };
    this.onCategoryDelete = this.onCategoryDelete.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    this.getCategories();
  }

  onCategoryDelete(id) {
    this.setState({ categoryIdToDelete: id });
    this.toggleModal();
  }

  onDelete() {
    deleteCategory(this.state.categoryIdToDelete)
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
    getLibraryCategories().then((categories) => {
      this.setState({ categories });
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
            <Category key={category._id} onDelete={this.onCategoryDelete} {...category} />
          ))}
        </ul>
        {this.state.isOpen && <Modal onConfirm={this.onDelete} toggle={this.toggleModal} />}
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
