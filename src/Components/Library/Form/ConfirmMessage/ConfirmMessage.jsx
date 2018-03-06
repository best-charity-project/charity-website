import React from 'react';
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
    }, 3000);
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
