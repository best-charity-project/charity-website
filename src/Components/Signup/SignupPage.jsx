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
      successMessage: '',
      errorMessage: '',
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
      if (data.error) {
        this.setState({ errorMessage: data.error });
        return;
      }
      this.setState({ successMessage: data.message });
      this.props.onSignup(data.userInfo);
      this.redirect();
    });
  }

  render() {
    return (
      <div className='indent'>
        {this.state.successMessage && <Message type='success' text={this.state.successMessage} />}
        {this.state.errorMessage && <Message type='error' text={this.state.errorMessage} />}
        <SignupForm onSubmit={this.handleFormSubmit} />
      </div>
    );
  }
}

export default withRouter(SignupPage);

SignupPage.propTypes = {
  onSignup: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
