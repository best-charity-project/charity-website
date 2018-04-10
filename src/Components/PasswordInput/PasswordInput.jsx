import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { minPasswordLength } from '../../configs/config.json';

export default class PasswordInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  getClasses() {
    return classNames({
      'form--field': true,
      'label-move-up': this.state.password,
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div className='form--box'>
        <input
          id={this.props.id}
          value={this.state.password}
          onChange={this.handlePasswordChange}
          type='password'
          className={this.getClasses()}
          minLength={minPasswordLength}
          required
        />
        <label htmlFor={this.props.id} className='form--placeholder'>
          {this.props.labelText}
        </label>
      </div>
    );
  }
}

PasswordInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  labelText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
