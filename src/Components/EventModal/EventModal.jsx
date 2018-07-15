import React, {Component} from 'react';
import '../News/News.css';
import moment from 'moment';
import {NavLink} from "react-router-dom";
import FullNews from '../FullNews/FullNews';
import '../EventModal/EventModal.css';
import Button from '../Button/Button';
import {Route} from 'react-router-dom';
import {withRouter} from "react-router-dom";

class EventModal extends Component {

    render() {
        let date = moment(this.props.event.dateStart).format('DD MMMM ');
        let month = date.split(' ')[1];
        return (
            <div>
                <div className = 'event-date-modal'>
                    <p className = 'day-event-modal'>
                        {moment(this.props.event.dateStart).format('D')}
                    </p>
                    <div className = 'time-title-event-modal'>
                        <span className = 'month-event-modal'>
                            {`${month} ${moment(this.props.event.dateStart).format('YYYY')},`}
                         </span>
                        {moment(this.props.event.dateStart).format('LT') !== moment(this.props.event.dateEnd).format('LT') ? 
                            <span className = 'time-event-modal'> 
                                {`${moment(this.props.event.dateStart).format('LT')} - ${moment(this.props.event.dateEnd).format('LT')}`}
                            </span>
                            : <span className = 'time-event-modal'> 
                                {`${moment(this.props.event.dateStart).format('LT')}`}
                            </span>}
                        <p className = 'title-event-modal'>{this.props.event.title}</p>
                    </div>
                    <div className = 'button-close' onClick = {this.closeWindow}/>
                </div>
                <div className = 'info-event-modal'>
                    <div className = 'place-tickets-event-modal'>
                        {this.props.event.place ?<p className = 'place-event-modal' onClick = {()=>this.getMap(this.props.event.place)}> <span>Место проведения:</span> <span className = 'event-place'>{this.props.event.place} </span> </p>:null }
                        {this.props.event.organizers? <p> <span> Организатор:</span>{this.props.event.organizers} </p>:null}
                        {this.props.event.participation ? <p className = 'tickets-event-modal'> <span>Билеты: </span>{this.props.event.linkParticipation ? <a href = {this.props.event.linkParticipation } target="_blank" > {this.props.event.participation }</a>: this.props.event.participation }  </p> :null}
                    </div>                
                    <div className = 'content-event-modal'>
                        <span dangerouslySetInnerHTML={{__html: this.props.event.text}}/>
                    </div>
                    {this.props.event.speakersArray ? 
                    <div className = 'speakers-event-modal'>                
                        <p> Докладчики:</p>
                        <ul>
                            {this.props.event.speakersArray.map((item,index) => {
                                return <li><span> {item}</span></li>
                            })}
                        </ul>
                    </div>:null }
                    {this.props.event.organization ||this.props.event.contactPerson ||this.props.event.contactPhone||this.props.event.website ?  
                    <div className = 'contacts-event-modal'>
                        <p className = 'contacts-title-event-modal'> Контакты:</p>
                        {this.props.event.organization ? <p>{this.props.event.organization} </p> : null}
                        <p>
                            {this.props.event.contactPerson? <span> {this.props.event.contactPerson}</span> : null}
                            {this.props.event.contactPhone ? <span className = 'phone-event-modal'> {this.props.event.contactPhone}</span> : null}       
                        </p>
                        <p className = 'website-event-modal'>
                            {this.props.event.website ? <a href = {this.props.event.website} target="_blank"  > {this.props.event.website}</a> :null} 
                        </p>
                    </div>:null}
                </div>
                <div className = 'buttons-event-modal'>
                    {this.props.event.linkParticipation ? 
                    <div
                        onClick = {this.closeWindow}
                        className = 'button-event button-event-ticket'>
                        <a href = {this.props.event.linkParticipation} target="_blank" >{(/^[\d]+$/g).test(this.props.event.participation) ? 'Купить': 'Записаться'}</a>
                     </div>: null}
                    <Button 
                        label = 'Закрыть окно' 
                        name = 'button-event button-event-close' 
                        clickHandler = {this.closeWindow}
                    />
                </div>
            </div>
        ) 
    }
    closeWindow = (e) => {
        this.props.closeModalWindow(e);
    }
    getMap = (place) => {
        this.props.history.push({
            pathname: '/events/map',
            state: { detail: place}
        })
    }
}

export default withRouter(EventModal);