import React from 'react';
import PropTypes from 'prop-types';

export default class SelectInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleOptionChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div className='form--box'>
        <select
          id={this.props.id}
          className='form--field field--select'
          value={this.props.value}
          onChange={this.handleOptionChange}
          required={this.props.required}
        >
          <option value='' disabled>
            {this.props.fieldName}
          </option>
          {this.props.data.map(item => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

SelectInput.defaultProps = {
  required: '',
};

SelectInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  required: PropTypes.string,
  fieldName: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
};
