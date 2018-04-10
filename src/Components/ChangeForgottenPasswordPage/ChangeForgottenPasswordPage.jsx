import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ChangeForgottenPasswordForm from './ChangeForgottenPasswordForm';
import { changeForgottenPassword, isValidToken } from '../../accountCalls';
import createMessage from '../Message/createMessage';
import Message from '../Message/Message';

export default class ChangeForgottenPasswordPage extends React.Component {
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
    isValidToken(token).then((isValid) => {
      this.setState({ isValidToken: isValid });
    });
  }

  handleFormSubmit(formData) {
    const { token } = this.props.match.params;
    changeForgottenPassword({ ...formData, token }).then((data) => {
      if (data.error) {
        this.setState({ message: createMessage('error', data.error) });
        return;
      }
      this.setState({ message: createMessage('success', data.message) });
    });
  }

  render() {
    return (
      <div className='changePassPage indent'>
        <Message {...this.state.message} />
        {this.state.isValidToken && (
          <ChangeForgottenPasswordForm buttonText='Отправить' onSubmit={this.handleFormSubmit} />
        )}
        {this.state.isValidToken === '' && <p>Загрузка...</p>}
        {this.state.isValidToken === false && <Redirect to='/login' />}
      </div>
    );
  }
}

ChangeForgottenPasswordPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string,
    }),
  }).isRequired,
};
