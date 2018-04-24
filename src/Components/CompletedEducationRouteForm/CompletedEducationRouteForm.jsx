import React from 'react';
import PropTypes from 'prop-types';
import { getEducation, deleteEducation, updateEducation } from '../../educationCalls';
import EducationRouteCard from './EducationRouteCard/EducationRouteCard';
import createMessage from '../Message/createMessage';
import Message from '../Message/Message';
import './CompletedEducationRouteForm.css';

export default class CompletedEducationRouteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersCards: [],
      message: {
        type: '',
        text: '',
      },
    };
    this.onEducationRouteCardDelete = this.onEducationRouteCardDelete.bind(this);
    this.onEducationRouteCardEdit = this.onEducationRouteCardEdit.bind(this);
  }

  componentDidMount() {
    this.getEducationByUserId();
  }

  onEducationRouteCardDelete(id) {
    deleteEducation(id).then((data) => {
      this.setMessage(data);
      this.getEducationByUserId();
    });
  }

  onEducationRouteCardEdit(id, educationToEdit) {
    updateEducation(id, educationToEdit).then((data) => {
      this.setMessage(data);
      this.getEducationByUserId();
    });
  }

  setMessage(data) {
    if (data.error) {
      this.setState({ message: createMessage('error', data.error) });
      return;
    }
    this.setState({ message: createMessage('success', data.message) });
  }

  getEducationByUserId() {
    getEducation(this.props.userId).then(usersCards => this.setState({ usersCards }));
  }

  render() {
    return (
      <div className='education-route'>
        <h2 className='secondary-heading'>Заполненные карты</h2>
        <div className='education-route--user-cards'>
          {this.state.usersCards.map((item, index) => (
            <EducationRouteCard
              index={index + 1}
              key={item._id}
              onDelete={this.onEducationRouteCardDelete}
              onEdit={this.onEducationRouteCardEdit}
              {...item}
            />
          ))}
        </div>
        <Message {...this.state.message} />
      </div>
    );
  }
}

CompletedEducationRouteForm.propTypes = {
  userId: PropTypes.string.isRequired,
};
