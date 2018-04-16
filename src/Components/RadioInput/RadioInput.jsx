import React from 'react';
import PropTypes from 'prop-types';

export default class RadioInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleReasonForRegistrationChange = this.handleReasonForRegistrationChange.bind(this);
  }

  handleReasonForRegistrationChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <p className='form--radio-input'>
        <input
          id={this.props.id}
          name={this.props.name}
          type='radio'
          className='radio-field'
          value={this.props.reason}
          checked={this.props.checked}
          onChange={this.handleReasonForRegistrationChange}
          required={this.props.required}
        />
        <label htmlFor={this.props.id} className='radio-input--label'>
          {this.props.reason}
        </label>
      </p>
    );
  }
}

RadioInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  reason: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  required: PropTypes.string.isRequired,
};
