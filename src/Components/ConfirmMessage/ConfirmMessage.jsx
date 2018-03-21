import React from 'react';
import PropTypes from 'prop-types';
import { confirmMessageTimer } from '../../configs/config.json';
import './ConfirmMessage.css';

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
      <div className={this.props.classNames}>{this.props.message}</div>
    ) : (
      <span />
    );
  }
}

export default ConfirmMessage;

ConfirmMessage.propTypes = {
  classNames: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
