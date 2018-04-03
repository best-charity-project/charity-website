import React from 'react';
import ChangePassForm from './ChangePassForm';
import { changePassword } from '../../accountCalls';
import Message from '../Message/Message';
import './changePassPage.css';

class ChangePassPage extends React.Component {
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
    changePassword(formData).then((data) => {
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
      <div className='changePassPage'>
        <Message {...this.state.message} />
        <ChangePassForm buttonText='Отправить' onSubmit={this.handleFormSubmit} />
      </div>
    );
  }
}

export default ChangePassPage;
