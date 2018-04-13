import React, { Component } from 'react';
import SmallCalendar from 'react-calendar';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

require('../../../node_modules/moment/locale/ru');

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      events: [
        {
          title: 'День рождения котика',
          start: moment('2018-04-13T02:30:00').toDate(),
          end: moment('2018-04-13T07:30:00').toDate(),
        },
        {
          title: 'День рождения енота',
          start: moment('2018-04-13T09:30:00').toDate(),
          end: moment('2018-04-13T18:30:00').toDate(),
        },
        {
          title: 'День рождения енота',
          start: moment('2018-04-13T09:30:00').toDate(),
          end: moment('2018-04-13T18:30:00').toDate(),
        },
        {
          title: 'День рождения енота',
          start: moment('2018-04-13T09:30:00').toDate(),
          end: moment('2018-04-13T18:30:00').toDate(),
        },
        {
          title: 'День рождения енота',
          start: moment('2018-04-13T09:30:00').toDate(),
          end: moment('2018-04-13T18:30:00').toDate(),
        },
        {
          title: 'День рождения енота',
          start: moment('2018-04-13T09:30:00').toDate(),
          end: moment('2018-04-13T18:30:00').toDate(),
        },
        {
          title: 'День рождения енота',
          start: moment('2018-04-13T09:30:00').toDate(),
          end: moment('2018-04-13T20:30:00').toDate(),
        },
        {
          title: 'Ужин',
          start: moment('2018-04-13T17:30:00').toDate(),
          end: moment('2018-04-13T23:30:00').toDate(),
        },
        {
          title: 'Вспомнить все',
          start: moment('2018-04-16T11:30:00').toDate(),
          end: moment('2018-04-16T18:30:00').toDate(),
        },
        {
          title: 'В магазин',
          start: moment('2018-04-03T11:30:00').toDate(),
          end: moment('2018-04-03T18:30:00').toDate(),
        },
        {
          title: '13 april',
          start: moment('2018-04-09T11:30:00').toDate(),
          end: moment('2018-04-09T18:30:00').toDate(),
        },
      ],
    };
    BigCalendar.momentLocalizer(moment);
    this.setDayOfEvent = this.setDayOfEvent.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onActiveDateChange = this.onActiveDateChange.bind(this);
  }

  componentDidMount() {
    window.document.querySelector('.rbc-label').innerText = 'Весь день';
    this.setDayOfEvent();
  }

  onChange(date) {
    this.setState({ date });
    this.setDayOfEvent();
  }

  onActiveDateChange() {
    this.setDayOfEvent();
  }

  setDayOfEvent() {
    const a = window.document.querySelectorAll('time[datetime]');
    const allDate = [];
    const eventDate = [];
    a.forEach((day) => {
      allDate.push(day.dateTime.substring(0, 10));
    });
    this.state.events.forEach((event) => {
      eventDate.push(moment(event.start)
        .format('YYYY-MM-DD')
        .substring(0, 10));
    });
    allDate.forEach((dateOfDay) => {
      eventDate.forEach((dateOfEvent) => {
        if (dateOfDay === dateOfEvent) {
          a.forEach((day) => {
            if (day.dateTime.substring(0, 10) === dateOfDay) {
              day.classList.add('event-day');
            }
          });
        }
      });
    });
  }

  render() {
    const formats = {
      dayFormat: 'LL',
    };
    return (
      <div className='calendar indent'>
        <h1 className='primary-heading'>Календарь событий</h1>
        <div className='calendar-wrapper'>
          <SmallCalendar
            minDetail='month'
            onChange={this.onChange}
            value={this.state.date}
            showNeighboringMonth={false}
            showNavigation
            onActiveDateChange={this.onActiveDateChange}
          />
          <div className='calendar--schedule'>
            <BigCalendar
              popup
              allDayAccessor='allDay'
              titleAccessor='title'
              startAccessor='start'
              endAccessor='end'
              formats={formats}
              date={this.state.date}
              toolbar={false}
              views={['day']}
              view='day'
              showMultiDayTimes
              events={this.state.events}
              step={60}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
