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
    return (
      <div className='confirm-wrapper' >
        {this.state.visible &&
          <div
            className='ivalidInputMessage'
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
