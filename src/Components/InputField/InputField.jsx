import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  getClasses() {
    return classNames({
      'form--field': true,
      'label-move-up': this.props.value,
    });
  }

  handleValueChange(event) {
    this.props.onChange(event);
  }

  render() {
    return (
      <div className={`form--box field-${this.props.size}`}>
        <input
          id={this.props.id}
          value={this.props.value}
          onChange={this.handleValueChange}
          type={this.props.type}
          className={this.getClasses()}
          minLength={this.props.minLength}
          placeholder={this.props.placeholder}
          pattern={this.props.pattern}
          required={this.props.required}
        />
        <label htmlFor={this.props.id} className='form--placeholder'>
          {this.props.labelText}
        </label>
      </div>
    );
  }
}

InputField.defaultProps = {
  required: '',
  minLength: '',
  size: '',
  placeholder: '',
  labelText: '',
  pattern: '(.*?)',
};

InputField.propTypes = {
  size: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  labelText: PropTypes.string,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  required: PropTypes.string,
  minLength: PropTypes.string,
  placeholder: PropTypes.string,
  pattern: PropTypes.string,
};
