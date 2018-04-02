import React from 'react';
import Form from '../Form/Form';
import { addLibraryItem } from '../../../libraryCalls';
import Message from '../../Message/Message';
import './AddLibraryItem.css';

class AddLibraryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        type: '',
        text: '',
      },
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formData) {
    addLibraryItem(formData)
      .then((data) => {
        this.setState({ message: { type: 'success', text: data.message } });
      })
      .catch((err) => {
        this.setState({ message: { type: 'error', text: err.response.data.message } });
      });
  }

  render() {
    return (
      <div className='add-library-item'>
        <h1 className='secondary-heading'>Добавление информации в библиотеку</h1>
        <Message {...this.state.message} />
        <Form
          onSubmit={this.handleFormSubmit}
          buttonText='Добавить'
          message='Документ был добавлен в библиотеку'
        />
        <p className='add-library-item-comment'>
          *** Информация отобразится в библиотеке после одобрения модератором
        </p>
      </div>
    );
  }
}

export default AddLibraryItem;
