import React from 'react';
import PropTypes from 'prop-types';
import './Admin.css';
import SingleNews from '../News/SingleNews/SingleNews';
import ControlButton from '../ControlButton/ControlButton';
import DetailsButton from '../DetailsButton/DetailsButton';

const AdminNewsItem = (props) => {
  function handleEdit() {
    props.onNewsUpdate({
      id: props._id,
      title: props.title,
      shortDescription: props.shortDescription,
      url: props.url,
      date: props.date,
    });
  }

  return (
    <div className='news-list--item'>
      <SingleNews title={props.title} shortDescription={props.shortDescription} />
      <ControlButton text='Редактировать' onButtonClick={handleEdit} />
      <ControlButton text='Удалить' onButtonClick={() => {}} />
      <DetailsButton text='ПОДРОБНЕЕ' url='https://tut.by' />
    </div>
  );
};

export default AdminNewsItem;

AdminNewsItem.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onNewsUpdate: PropTypes.func.isRequired,
};
