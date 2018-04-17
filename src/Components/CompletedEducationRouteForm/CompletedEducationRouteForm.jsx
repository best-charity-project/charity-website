import React from 'react';
import PropTypes from 'prop-types';
import uiLogger from '../../logdown/uiLogger';
import { getEducation } from '../../educationCalls';
import EducationRouteCard from './EducationRouteCard/EducationRouteCard';
import cancelablePromise from '../../utils/cancelablePromise';
import './CompletedEducationRouteForm.css';

export default class CompletedEducationRouteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersCards: [],
    };
  }

  componentDidMount() {
    this.getEducationByUserId();
  }

  componentWillUnmount() {
    this.cancelablePromise.cancel();
  }

  getEducationByUserId() {
    this.cancelablePromise = cancelablePromise(getEducation(this.props.userId));
    this.cancelablePromise.promise
      .then(usersCards => this.setState({ usersCards }))
      .catch((err) => {
        uiLogger.log(err);
      });
  }

  render() {
    return (
      <div className='education-route'>
        <h2 className='secondary-heading'>Заполненные карты</h2>
        <div className='education-route--user-cards'>
          {this.state.usersCards.map((item, index) => (
            <EducationRouteCard index={index + 1} key={item._id} {...item} />
          ))}
        </div>
      </div>
    );
  }
}

CompletedEducationRouteForm.propTypes = {
  userId: PropTypes.string.isRequired,
};
