import React from 'react';
import { addEvents } from '../../../eventsCalls';
import EventForm from './EventsForm';
import Message from '../../Message/Message';

class AddEvent extends React.Component {
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
    addEvents(formData)
      .then((data) => {
        this.setState({ message: { type: 'success', text: data.message } });
      })
      .catch((err) => {
        this.setState({ message: { type: 'error', text: err.response.data.message } });
      });
  }

  render() {
    return (
      <div className='admin-events'>
        <h1 className='secondary-heading'>Добавление события</h1>
        <Message {...this.state.message} />
        <EventForm onSubmit={this.handleFormSubmit} buttonText='Добавить событие' />
      </div>
    );
  }
}

export default AddEvent;
