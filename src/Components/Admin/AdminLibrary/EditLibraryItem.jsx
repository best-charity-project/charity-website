import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../Library/Form/Form';
import { updateItem, getItemById } from '../../../libraryCalls';

class EditLibraryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      libraryItem: null,
    };
    this.getLibraryItems = this.getLibraryItems.bind(this);
    this.updateLibraryItem = this.updateLibraryItem.bind(this);
  }

  componentDidMount() {
    this.getLibraryItems();
  }

  getLibraryItems() {
    const { id } = this.props.match.params;
    getItemById(id).then((item) => {
      this.setState({ libraryItem: item });
    });
  }

  updateLibraryItem(item) {
    updateItem(this.props.match.params.id, item);
  }

  render() {
    return (
      <div>
        <h1 className='form-library--heading'>Редактирование документа</h1>
        <Form
          item={this.state.libraryItem}
          onSubmit={this.updateLibraryItem}
          message='Документ был отредактирован'
          buttonText='Сохранить'
        />
      </div>
    );
  }
}

export default EditLibraryItem;

EditLibraryItem.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
