import React from 'react';
import PropTypes from 'prop-types';
import './Message.css';
import { confirmMessageTimer } from '../../configs/config.json';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.hide = this.hide.bind(this);
    this.getClass = this.getClass.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      visible: true,
    });
    this.hide();
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

  hide() {
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

export default Message;

Message.defaultProps = {
  text: '',
  type: '',
};

Message.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
};
