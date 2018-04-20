import React from 'react';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import InputField from '../../InputField/InputField';
import './EventsForm.css';

class EventsForm extends React.Component {
  static getClasses(value) {
    return classNames({
      'label-move-up': value,
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      allDay: false,
      title: '',
      startDay: '',
      startTime: '',
      endDay: '',
      endTime: '',
      description: '',
      url: '',
    };
    this.setAllDay = this.setAllDay.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setStartDay = this.setStartDay.bind(this);
    this.setStartTime = this.setStartTime.bind(this);
    this.setEndDay = this.setEndDay.bind(this);
    this.setEndTime = this.setEndTime.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.setUrl = this.setUrl.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setAllDay(event) {
    const { checked } = this.state;
    checked[event.target.value] = !checked[event.target.value];
    this.setState({
      allDay: event.target.value,
    });
  }

  setTitle(event) {
    this.setState({
      title: event.target.value,
    });
  }

  setStartDay(event) {
    this.setState({
      startDay: event.target.value,
    });
  }

  setStartTime(event) {
    this.setState({
      startTime: event.target.value,
    });
  }

  setEndDay(event) {
    this.setState({
      endDay: event.target.value,
    });
  }

  setEndTime(event) {
    this.setState({
      endTime: event.target.value,
    });
  }

  setDescription(event) {
    this.setState({
      description: event.target.value,
    });
  }

  setUrl(event) {
    this.setState({
      url: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      allDay, title, description, startDay, startTime, endDay, endTime, url,
    } = this.state;
    let start = startDay.concat(` ${startTime}`);
    start = moment(start, 'DD/MM/YYYY HH:mm').format();
    let end = endDay.concat(` ${endTime}`);
    end = moment(end, 'DD/MM/YYYY HH:mm').format();
    this.props.onSubmit({
      allDay,
      title,
      start,
      end,
      description,
      url,
    });
  }

  render() {
    return (
      <div>
        <form className='form events-form' onSubmit={this.handleSubmit}>
          <div className='events-form--field-box'>
            <InputField
              id='title'
              type='text'
              size='wide'
              value={this.state.title}
              onChange={this.setTitle}
              labelText='Заголовок события'
              required='required'
            />
          </div>
          <div className='events-form--field-box'>
            <InputMask
              id='start-day'
              value={this.state.startDay}
              onChange={this.setStartDay}
              type='text'
              mask='99/99/9999'
              className={`${EventsForm.getClasses(this.state.startDay)} form--field field-narrow`}
              required
            />
            <label htmlFor='start-time' className='form--placeholder form--placeholder-small'>
            Дата начала
            </label>
          </div>
          <div className='events-form--field-box'>
            <InputMask
              value={this.state.startTime}
              onChange={this.setStartTime}
              id='start-time'
              type='text'
              mask='99:99'
              className={`${EventsForm.getClasses(this.state.startTime)} form--field field-narrow`}
            />
            <label
              htmlFor='start-time'
              className='form--placeholder form--placeholder-small'
            >Время начала
            </label>
          </div>
          <div className='events-form--field-box'>
            <InputMask
              value={this.state.endDay}
              onChange={this.setEndDay}
              id='end-day'
              type='text'
              mask='99/99/9999'
              className={`${EventsForm.getClasses(this.state.endDay)} form--field field-narrow`}
              required
            />
            <label
              htmlFor='end-day'
              className='form--placeholder form--placeholder-small'
            >Дата окончания
            </label>
          </div>
          <div className='events-form--field-box'>
            <InputMask
              value={this.state.endTime}
              onChange={this.setEndTime}
              id='end-time'
              type='text'
              mask='99:99'
              className={`${EventsForm.getClasses(this.state.endTime)} form--field field-narrow`}
            />
            <label
              htmlFor='end-time'
              className='form--placeholder form--placeholder-small'
            >
            Время окончания
            </label>
          </div>
          <div className='events-form--field-box'>
            <input
              type='checkbox'
              className='field-box--checkbox'
              value={this.state.allDay}
              onChange={this.state.setAllDay}
            />
            <span>Мероприятие длится целый день</span>
          </div>
          <div className='events-form--field-box'>
            <textarea
              id='description'
              value={this.state.description}
              onChange={this.setDescription}
              type='text'
              className={`events-description ${EventsForm.getClasses(this.state.description)}`}
              required
            />
            <label htmlFor='description' className='form--placeholder'>Описание события</label>
          </div>
          <div className='events-form--field-box'>
            <InputField
              id='url'
              size='medium'
              type='url'
              value={this.state.url}
              onChange={this.setUrl}
              labelText='Ссылка на событие'
            />
          </div>
          <input
            type='submit'
            className='control-button control-button-primary'
            value='Отправить'
          />
        </form>
      </div>
    );
  }
}

export default EventsForm;

EventsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
