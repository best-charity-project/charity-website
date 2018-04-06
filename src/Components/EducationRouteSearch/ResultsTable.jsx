import React from 'react';
import PropTypes from 'prop-types';
import './ResultsTable.css';

const ResultsTable = props => (
  <tr className='table--body'>
    <td className='body--header'>Карта № {props.index + 1}</td>
    <td className='body--field'>
      <ul className='field--list'>
        <li>{props.name}</li>
        <li>{props.email}</li>
        <li>{props.phone}</li>
      </ul>
    </td>
    <td className='body--field'>
      <ul className='field--list'>
        <li>{props.region}</li>
        {props.regionDistricts.map(regionDistrict => (
          <li key={regionDistrict}>{regionDistrict}</li>
        ))}
        <li>{props.city}</li>
      </ul>
    </td>
    <td className='body--field'>
      {props.firstYear}-{props.lastYear}
    </td>
    <td className='body--field'>{props.educationalInstitution}</td>
    <td className='body--field'>{props.program}</td>
  </tr>
);

export default ResultsTable;

ResultsTable.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  regionDistricts: PropTypes.arrayOf(PropTypes.string).isRequired,
  city: PropTypes.string.isRequired,
  firstYear: PropTypes.number.isRequired,
  lastYear: PropTypes.number.isRequired,
  educationalInstitution: PropTypes.string.isRequired,
  program: PropTypes.string.isRequired,
};
