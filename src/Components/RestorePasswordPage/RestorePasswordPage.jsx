import React from 'react';
import RestorePasswordForm from './RestorePasswordForm';
import { restorePassword } from '../../accountCalls';
import Message from '../Message/Message';
import createMessage from '../Message/createMessage';

export default class RestorePasswordPage extends React.Component {
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
      if (data.error) {
        this.setState({ message: createMessage('error', data.error) });
        return;
      }
      this.setState({ message: createMessage('success', data.message) });
    });
  }

  render() {
    return (
      <div className='indent'>
        <Message {...this.state.message} />
        <RestorePasswordForm buttonText='Отправить' onSubmit={this.handleFormSubmit} />
      </div>
    );
  }
}
