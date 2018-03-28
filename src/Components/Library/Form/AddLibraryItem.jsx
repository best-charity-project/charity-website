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

  handleFormSubmit(d) {
    addLibraryItem(d).then((data) => {
      let message = {};
      if (data.error) {
        message = { type: 'error', text: data.error };
        this.setState({ message });
      } else {
        message = { type: 'success', text: data.message };
        this.setState({ message });
      }
    });
  }

  render() {
    return (
      <div>
        <h1 className='secondary-heading'>Добавление информации в библиотеку</h1>
        <Message {...this.state.message} />
        <Form
          onSubmit={this.handleFormSubmit}
          buttonText='Добавить'
          message='Документ был добавлен в библиотеку'
        />
        <p className='add-library-item-comment'>
          *** Информация отобразиться в библиотеке после одобрения модератором
        </p>
      </div>
    );
  }
}

export default AddLibraryItem;
