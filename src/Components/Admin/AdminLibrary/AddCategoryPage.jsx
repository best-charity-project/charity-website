import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AddCategoryForm from './AddCategoryForm';
import { addCategory } from '../../../libraryCalls';

class AddCategoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formData) {
    addCategory(formData)
      .then((data) => {
        this.props.showMessage({ type: 'success', text: data.message });
      })
      .catch((err) => {
        this.props.showMessage({ type: 'error', text: err.response.data.message });
      });
  }

  render() {
    return (
      <div>
        <AddCategoryForm buttonText='Добавить' onSubmit={this.handleFormSubmit} />
      </div>
    );
  }
}

export default withRouter(AddCategoryPage);

AddCategoryPage.propTypes = {
  showMessage: PropTypes.func.isRequired,
};
