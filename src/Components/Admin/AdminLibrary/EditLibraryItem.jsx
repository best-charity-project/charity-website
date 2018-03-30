import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Form from '../../Library/Form/Form';
import { updateItem, getItemById } from '../../../libraryCalls';
import checkMessageType from '../checkMessageType';
import Message from '../../Message/Message';
import BackIcon from '../../icons/back.svg';
import './EditLibraryItem.css';

class EditLibraryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      libraryItem: null,
      message: {
        type: '',
        text: '',
      },
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
    updateItem(this.props.match.params.id, item)
      .then((data) => {
        this.setState({ message: checkMessageType(data, 'success') });
      })
      .catch((err) => {
        this.setState({ message: checkMessageType(err, 'error') });
      });
  }

  render() {
    return (
      <div>
        <img src={BackIcon} alt='иконка' className='library-items--icon' />
        <NavLink to='/admin/library/libraryItems' className='library-items--link'>
          Вернуться к списку
        </NavLink>
        <h1 className='secondary-heading'>Редактирование документа</h1>
        <Message {...this.state.message} />
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
