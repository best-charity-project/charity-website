import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignupForm from './SignupForm';
import { signupUser } from '../../Auth/Auth';
import Message from '../Message/Message';
import { redirectTime } from '../../configs/config.json';
import './SignupForm.css';

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        type: '',
        text: '',
      },
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  redirect() {
    setTimeout(() => {
      this.props.history.push('/home');
    }, redirectTime);
  }

  handleFormSubmit(formData) {
    signupUser(formData).then((data) => {
      let message = {};
      if (data.error) {
        message = { type: 'error', text: data.error };
        this.setState({ message });
        return;
      }
      message = { type: 'success', text: data.message };
      this.setState({ message });
      this.props.onAuthChange(data.userInfo);
      this.redirect();
    });
  }

  render() {
    return (
      <div className='indent'>
        <Message {...this.state.message} />
        <SignupForm onSubmit={this.handleFormSubmit} />
      </div>
    );
  }
}

export default withRouter(SignupPage);

SignupPage.propTypes = {
  onAuthChange: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};