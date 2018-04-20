import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shortenText from '../../utils/ShortenText';
import './CalendarEvent.css';

const CalendarEvent = ({
  title, description, url, start, end,
}) => (
  <div className='calendar-event'>
    <h2 className='event--title'>{title}</h2>
    <p className='event--description'>{shortenText(description)}</p>
    <div className='event--time-wrapper'>
      <div className='time--box'>
        <p className='time--box--value'>Когда: {moment(start).format('LL')}</p>
      </div>
      <div className='time--box'>
        <p className='event--time'>Время начала: {moment(start).format('HH:mm')}</p>
        <p className='event--time'>Время окончания: {moment(end).format('HH:mm')}</p>
      </div>
    </div>

    <Link to={url} className='event--link' rel='noopener noreferrer'>
      подробнее
    </Link>
  </div>
);

export default CalendarEvent;

CalendarEvent.defaultProps = {
  description: 'Для этого события нет описания',
  url: '',
};

CalendarEvent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  url: PropTypes.string,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
};
