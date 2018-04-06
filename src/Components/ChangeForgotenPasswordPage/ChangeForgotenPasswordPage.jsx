import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ChangeForgotenPasswordForm from './ChangeForgotenPasswordForm';
import { changeForgottenPassword, isValidToken } from '../../accountCalls';
import Message from '../Message/Message';

class ChangeForgotenPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidToken: '',
      message: {
        type: '',
        text: '',
      },
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    const { token } = this.props.match.params;
    isValidToken(token).then((result) => {
      this.setState({ isValidToken: result });
    });
  }

  handleFormSubmit(formData) {
    const { token } = this.props.match.params;
    changeForgottenPassword({ ...formData, token }).then((data) => {
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
      <div className='changePassPage indent'>
        <Message {...this.state.message} />
        {this.state.isValidToken === true && (
          <ChangeForgotenPasswordForm buttonText='Отправить' onSubmit={this.handleFormSubmit} />
        )}
        {this.state.isValidToken === '' && <p>Загрузка...</p>}
        {this.state.isValidToken === false && <Redirect to='/login' />}
      </div>
    );
  }
}

export default ChangeForgotenPasswordPage;

ChangeForgotenPasswordPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string,
    }),
  }).isRequired,
};
