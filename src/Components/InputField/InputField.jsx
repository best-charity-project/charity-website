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

  handleValueChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div className='form--box'>
        <input
          id={this.props.id}
          value={this.props.value}
          onChange={this.handleValueChange}
          type={this.props.type}
          className={this.getClasses()}
          minLength={this.props.minLength}
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
};

InputField.propTypes = {
  onChange: PropTypes.func.isRequired,
  labelText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  required: PropTypes.string,
  minLength: PropTypes.string,
  value: PropTypes.string.isRequired,
};
