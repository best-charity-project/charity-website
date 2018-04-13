import React from 'react';
import PropTypes from 'prop-types';
import { getEducation } from '../../educationCalls';
import EducationRouteCard from './EducationRouteCard/EducationRouteCard';
import makeCancelablePromise from '../../utils/makeCancelablePromise';
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
    this.cancelablPromise.cancel();
  }

  getEducationByUserId() {
    this.cancelablPromise = makeCancelablePromise(getEducation(this.props.userId));
    this.cancelablPromise.promise.then(usersCards => this.setState({ usersCards })).catch((err) => {
      this.error = err;
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
