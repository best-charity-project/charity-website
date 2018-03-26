import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import { loginUser } from '../../Auth/Auth';
import Message from '../Message/Message';
import './LoginForm.css';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        type: '',
        text: '',
      },
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.setErrorMessage = this.setErrorMessage.bind(this);
  }

  setErrorMessage(message) {
    this.setState({ message });
  }

  handleFormSubmit(formData) {
    loginUser(formData)
      .then((userInfo) => {
        this.props.onAuthChange(userInfo);
        this.props.history.push('/home');
      })
      .catch((err) => {
        this.setErrorMessage({ type: 'error', text: err.response.data.error });
      });
  }

  render() {
    return (
      <div className='login indent'>
        <LoginForm buttonText='Вход' onSubmit={this.handleFormSubmit} />
        <Message {...this.state.message} />
      </div>
    );
  }
}

export default withRouter(LoginPage);

LoginPage.propTypes = {
  onAuthChange: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
