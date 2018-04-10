import React from 'react';
import PropTypes from 'prop-types';
import { minPasswordLength } from '../../configs/config.json';

export default class PasswordInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
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
          className={this.state.password ? 'form--field label-move-up' : 'form--field'}
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
