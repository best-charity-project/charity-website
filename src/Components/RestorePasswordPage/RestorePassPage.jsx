import React from 'react';
import RestorePassForm from './RestorePassForm';
import restorePassword from '../../accountCalls';
import Message from '../Message/Message';

class RestorePassPage extends React.Component {
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

  handleFormSubmit(email) {
    restorePassword(email).then((data) => {
      let message = {};
      if (data.error) {
        message = { type: 'error', text: data.error };
        this.setState({ message });
        return;
      }
      message = { type: 'success', text: data.message };
      this.setState({ message });
    });
  }

  render() {
    return (
      <div className='indent'>
        <Message {...this.state.message} />
        <RestorePassForm buttonText='Отправить' onSubmit={this.handleFormSubmit} />
      </div>
    );
  }
}

export default RestorePassPage;
