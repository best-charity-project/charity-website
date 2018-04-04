import React from 'react';
import PropTypes from 'prop-types';
import { getEducation } from '../../educationCalls';
import EducationRouteCard from './EducationRouteCard/EducationRouteCard';

export default class CompletedEducationRouteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersCarts: [],
    };
  }

  componentDidMount() {
    this.getById();
  }

  getById() {
    getEducation(this.props.userId).then(usersCarts => this.setState({ usersCarts }));
  }

  render() {
    return (
      <div className='education-route'>
        <h2 className='secondary-heading'>Заполненные карты</h2>
        <div className='education-route--user-cards'>
          {this.state.usersCarts.map((item, index) => (
            <EducationRouteCard index={index} key={item._id} {...item} />
          ))}
        </div>
      </div>
    );
  }
}

CompletedEducationRouteForm.propTypes = {
  userId: PropTypes.string.isRequired,
};
