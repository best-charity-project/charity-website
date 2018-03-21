import React from 'react';
import PropTypes from 'prop-types';
import SignupForm from './SignupForm';
import { signupUser } from '../../Auth/Auth';
import './SignupForm.css';

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: '',
      errorMessage: '',
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formData) {
    signupUser(formData).then((res) => {
      if (res.data.error) {
        this.setState({ errorMessage: res.data.error });
        return;
      }
      this.setState({ successMessage: res.data.message });
      this.props.onSignup(res.data.userInfo);
    });
  }

  render() {
    return (
      <div className='indent'>
        <SignupForm onSubmit={this.handleFormSubmit} />
        <p className='signup--success-message'>{this.state.successMessage}</p>
        <p className='signup--error-message'>{this.state.errorMessage}</p>
      </div>
    );
  }
}

export default SignupPage;

SignupPage.propTypes = {
  onSignup: PropTypes.func.isRequired,
};
