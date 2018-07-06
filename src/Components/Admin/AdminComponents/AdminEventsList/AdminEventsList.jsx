import React, {Component} from 'react';
import AdminEvent from '../AdminEvent/AdminEvent';
import './AdminEventsList.css';
import AdminCreateEvent from '../AdminCreateEvent/AdminCreateEvent';
import { server } from '../../../../api';
import {withRouter} from "react-router-dom";
import axios from 'axios';

class AdminEventsList extends Component {
    state = {    
        events:this.props.events
    };
    render() {
        return (
            <div className="events-list-admin">
                <div className="events-list-header">
                    <div>Название события</div>
                    <div>Дата проведения</div>
                    <div>Удалить событие</div>   
                </div>            
                <div>                    
                    {this.state.events.map(event => 
                        <AdminEvent 
                            clickHandler = {() => this.getEventInfo(event) }
                            event = {event} 
                            key = {event._id} 
                            deleteHandler = {() => this.deleteEvent(event)} 
                        />                        
                        )}
                </div>  
            </div>  
        )
    }
    deleteEvent = (event) => {
        axios({
            method: 'delete',
            url: `${server}/events`,
            data: event,
            config: { headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }}
        })
        .then((result) => {
            this.setState({            
                events: this.state.events.filter(item => item._id !== result.data.news._id)
            }) 
        })  
      };

    getEventInfo = (event) => {
        let id = event._id
        const URL = `${ server }/events/`+id;
        fetch(URL)
        .then(response => response.json())
        .then(data => {
            this.setState({ eventInfo: data });
            this.props.history.push({
                pathname: '/admin-panel/events/create',
                state: { detail: this.state.eventInfo}
            })
        })
        
    }
    }
export default withRouter(AdminEventsList);