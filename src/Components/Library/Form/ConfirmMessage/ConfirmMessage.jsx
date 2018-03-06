import React from 'react';
import './ConfirmMessage.css';
import { timer } from '../../../../configs/config.json';

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
    }, timer);
  }

  render() {
    return this.state.visible ? (
      <div className='confirm-message'>Документ был добавлен в библиотеку</div>
    ) : (
      <span />
    );
  }
}

export default ConfirmMessage;
