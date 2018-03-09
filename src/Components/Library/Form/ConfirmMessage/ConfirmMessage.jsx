import React from 'react';
import './ConfirmMessage.css';
import { confirmMessageTimer } from '../../../../configs/config.json';

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
      <div className='confirm-message'>Документ был добавлен в библиотеку</div>
    ) : (
      <span />
    );
  }
}

export default ConfirmMessage;
