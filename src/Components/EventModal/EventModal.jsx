import React, {Component} from 'react';
import '../News/News.css';
import moment from 'moment';
import {NavLink} from "react-router-dom";
import FullNews from '../FullNews/FullNews';
import '../EventModal/EventModal.css';
import Button from '../Button/Button'
class EventModal extends Component {

    render() {
        let date = moment(this.props.event.dateStart).format('DD MMMM ');
        let month = date.split(' ')[1]
        console.log(this.props.event)
        return (
            <div>
                <div className = 'event-date-modal'>
                    <p className = 'day-event-modal'>{moment(this.props.event.dateStart).format('D')}</p>
                    <div>
                        <span className = 'month-event-modal'> {`${month} ${moment(this.props.event.dateStart).format('YYYY')},`}</span>
                        {moment(this.props.event.dateStart).format('LT') !== moment(this.props.event.dateEnd).format('LT') ? 
                        <span className = 'time-event-modal'> {`${moment(this.props.event.dateStart).format('LT')} - ${moment(this.props.event.dateEnd).format('LT')}`}</span>
                        : <span className = 'time-event-modal'> {`${moment(this.props.event.dateStart).format('LT')}`}</span>}
                        <p className = 'title-event-modal'>{this.props.event.title}</p>
                    </div>
                </div>
                <div className = 'info-event-modal'>
                <div className = 'place-tickets-event-modal'>
                    <p className = 'place-event-modal'> <span>Место проведения:</span> {this.props.event.place} </p>
                    <p> <span> Организатор:</span>{this.props.event.organizers} </p>
                    <p className = 'tickets-event-modal'> <span>Билеты </span>{this.props.event.linkParticipation ? <a href = {this.props.event.linkParticipation }> {this.props.event.participation }</a>: this.props.event.participation }  </p> 
                </div>
                
                <div className = 'content-event-modal'>
                    <span dangerouslySetInnerHTML={{__html: this.props.event.text}}/>
                </div>
                {this.props.event.speakersArray ? <div className = 'speakers-event-modal'>
                
                <p> Докладчики</p>
                <ul>
                    {this.props.event.speakersArray.map((item,index) => {
                        return <li> {item}</li>
                    })}
                </ul>
            </div>:null }
               <div className = 'contacts-event-modal'>
               <p> Контакты</p>
               {this.props.event.organization ? <p>{this.props.event.organization} </p> : null}
               <p>
                    {this.props.event.contactPerson? <span> {this.props.event.contactPerson}</span> : null}
                    {this.props.event.contactPhone ? <span> {this.props.event.contactPhone}</span> : null}       
                </p>
                <p>
                    {this.props.event.website ? <a href = {this.props.event.website} > {this.props.event.website}</a> :null} 
                </p>
                </div>
                </div>
                <div className = 'buttons-event-modal'>
                    {this.props.event.linkParticipation ? <Button
                    name = 'button-event button-event-ticket'
                     label = {(/^[\d]+$/g).test(this.props.event.participation)? 'Купить билет': 'Записаться'}/>: null}
                    <Button label = 'Закрыть окно' name = 'button-event button-event-close'/>
                </div>

            </div>
        ) 
    }
}

export default EventModal;