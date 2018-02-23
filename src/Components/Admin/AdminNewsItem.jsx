import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Admin.css';
import SingleNews from '../News/SingleNews/SingleNews';
import ControlButton from '../ControlButton/ControlButton';
import DetailsButton from '../DetailsButton/DetailsButton';

const AdminNewsItem = (props) => {
  function handleEditClick() {
    props.history.push(`${props.match.url}/edit/${props._id}`);
  }

  return (
    <div className='news-list--item'>
      <SingleNews title={props.title} shortDescription={props.shortDescription} />
      <ControlButton text='Редактировать' onButtonClick={handleEditClick} />
      <ControlButton text='Удалить' onButtonClick={() => {}} />
      <DetailsButton text='ПОДРОБНЕЕ' url='https://tut.by' />
    </div>
  );
};

export default withRouter(AdminNewsItem);

AdminNewsItem.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
