import React from 'react';
import PropTypes from 'prop-types';
import './EducationRouteCard.css';

export default class EducationRouteCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='user-cards-wrapper'>
        <h2 className='user-cards--title'>Карта № {this.props.index + 1}</h2>
        <div className='users-card'>
          <p className='users-card--field'>{this.props.name}</p>
          <p className='users-card--field'>{this.props.email}</p>
          <p className='users-card--field'>{this.props.phone}</p>
          <p className='users-card--field'>{this.props.region}</p>
          <ul className='users-card--field--list'>
            {this.props.regionDistricts.map(regionDistrict => (
              <li key={regionDistrict}>{regionDistrict}</li>
            ))}
          </ul>
          <p className='users-card--field'>{this.props.city}</p>
          <p className='users-card--field'>{this.props.educationalInstitution}</p>
          <p className='users-card--field'>{this.props.program}</p>
          <p className='users-card--field'>
            <span>Начало обучения с </span>
            <span className=''>{this.props.firstYear}</span>
            <span>, но не позднее </span>
            <span className=''>{this.props.lastYear}</span>
          </p>
        </div>
      </div>
    );
  }
}

EducationRouteCard.propTypes = {
  city: PropTypes.string.isRequired,
  educationalInstitution: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  firstYear: PropTypes.number.isRequired,
  lastYear: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  program: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  regionDistricts: PropTypes.arrayOf(PropTypes.string).isRequired,
};
