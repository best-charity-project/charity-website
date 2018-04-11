import React from 'react';
import PropTypes from 'prop-types';

class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.handleDataChange = this.handleDataChange.bind(this);
  }

  handleDataChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <div>
        <p className='form--label'>
          <label htmlFor={this.props.id}>{this.props.label}</label>
        </p>
        <input
          id={this.props.id}
          value={this.props.value}
          onChange={this.handleDataChange}
          type={this.props.type}
          placeholder={this.props.placeholder}
          className='form--input'
          required={this.props.required}
        />
      </div>
    );
  }
}

export default InputField;

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  required: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
