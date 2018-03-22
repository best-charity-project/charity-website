import React from 'react';
import PropTypes from 'prop-types';
import './Message.css';
import { confirmMessageTimer } from '../../configs/config.json';

class ConfirmMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
    this.setTimer = this.setTimer.bind(this);
    this.getClass = this.getClass.bind(this);
  }

  componentDidMount() {
    this.setTimer();
  }

  getClass() {
    if (this.props.type === 'success') {
      return 'message-success';
    }
    if (this.props.type === 'error') {
      return 'message-error';
    }
    return null;
  }

  setTimer() {
    setTimeout(() => {
      this.setState({ visible: false });
    }, confirmMessageTimer);
  }

  render() {
    return (
      this.state.visible && <div className={`message ${this.getClass()}`}>{this.props.text}</div>
    );
  }
}

export default ConfirmMessage;

ConfirmMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
