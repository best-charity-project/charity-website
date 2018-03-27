import React from 'react';
import PropTypes from 'prop-types';
import { confirmMessageTimer } from '../../../configs/config.json';
import './IvalidInputMessage.css';

class ConfirmMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
    this.setTimer = this.setTimer.bind(this);
  }

  componentDidMount() {
    this.setTimer();
  }

  setTimer() {
    setTimeout(() => {
      this.setState({ visible: false });
    }, confirmMessageTimer);
  }

  render() {
    return this.state.visible ? (
      <div className='ivalidInputMessage'>{this.props.message}</div>
    ) : (
      <span />
    );
  }
}

export default ConfirmMessage;

ConfirmMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
