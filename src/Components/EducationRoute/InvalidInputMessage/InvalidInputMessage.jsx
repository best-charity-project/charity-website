import React from 'react';
import PropTypes from 'prop-types';
import { confirmMessageTimer } from '../../../configs/config.json';
import './InvalidInputMessage.css';

class InvalidInputMessage extends React.Component {
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
      <div className='invalid-input-message--wrapper' >
        {this.state.visible &&
          <div
            className='invalid-input-message'
          >{this.props.message}
          </div>}
      </div>
    );
  }
}

export default InvalidInputMessage;

InvalidInputMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
