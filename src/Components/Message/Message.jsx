import React from 'react';
import PropTypes from 'prop-types';
import { confirmMessageTimer } from '../../configs/config.json';
import './Message.css';

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
    this.whatType();
  }

  setTimer() {
    setTimeout(() => {
      this.setState({ visible: false });
    }, confirmMessageTimer);
  }

  whatType() {
    let classname = '';
    if (this.props.type === 'alert') { classname = 'message alert'; }
    if (this.props.type === 'confirm') { classname = 'message confirm'; }
    return classname;
  }

  render() {
    return (
      <div className='confirm-wrapper' >
        {this.state.visible &&
          <div
            className={this.whatType()}
            type={this.props.type}
          >{this.props.message}
          </div>}
      </div>
    );
  }
}

export default ConfirmMessage;

ConfirmMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
