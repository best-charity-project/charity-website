import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import { loginUser } from '../../Auth/Auth';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formData) {
    loginUser(formData)
      .then((userInfo) => {
        this.props.onLogin(userInfo);
        this.props.history.push('/home');
      })
      .catch((err) => {
        if (err) {
          this.setState({ errorMessage: err.response.data.error });
        }
      });
  }

  render() {
    return (
      <div className='login indent'>
        <LoginForm buttonText='Вход' onSubmit={this.handleFormSubmit} />
        <p className='login--error-message'>{this.state.errorMessage}</p>
      </div>
    );
  }
}

export default withRouter(LoginPage);

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
