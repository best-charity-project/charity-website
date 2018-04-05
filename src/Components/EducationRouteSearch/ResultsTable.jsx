import React from 'react';
import PropTypes from 'prop-types';
import './ResultsTable.css';

const ResultsTable = props => (
  <tr className='table--body'>
    <td className='table--title'>Карта № {props.index + 1}</td>
    <td className='body--field'>
      <ul>
        {props.regionDistricts.map(regionDistrict => (
          <li key={regionDistrict}>{regionDistrict}</li>
        ))}
      </ul>
    </td>
    <td className='body--field'>{props.city}</td>
    <td className='body--field'>
      {props.firstYear}-{props.lastYear}
    </td>
    <td className='body--field'>{props.program}</td>
    <td className='body--field'>{props.name}</td>
    <td className='body--field'>{props.email}</td>
    <td className='body--field'>{props.phone}</td>
  </tr>
);

export default ResultsTable;

ResultsTable.propTypes = {
  index: PropTypes.number.isRequired,
  regionDistricts: PropTypes.arrayOf(PropTypes.string).isRequired,
  city: PropTypes.string.isRequired,
  firstYear: PropTypes.number.isRequired,
  lastYear: PropTypes.number.isRequired,
  program: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};
