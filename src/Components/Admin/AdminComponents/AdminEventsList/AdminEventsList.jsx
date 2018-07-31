import React, {Component} from 'react';
import AdminEvent from '../AdminEvent/AdminEvent';
import './AdminEventsList.css';
import AdminCreateEvent from '../AdminCreateEvent/AdminCreateEvent';
import { server } from '../../../../api';
import {withRouter} from "react-router-dom";
import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

class AdminEventsList extends Component {
    state = {    
        events : this.props.events
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
                events : this.state.events.filter(item => item._id !== result.data.news._id)
            }) 
        })
        this.deletePostVK(event);
      };
    deletePostVK = (event) => {
        let token = '3af1950569018a83d220116bc7b9ae2c1a88abe51862011dd39be884689ea489df2f4c910e7b20f732d0d';
        let id = '-169499477';
        axios({
            method: 'delete',
            adapter: jsonpAdapter,
            url: `https://api.vk.com/method/wall.delete?owner_id=${id}&post_id=${event.idVK}&access_token=${token}&v=5.80`            
        }); 
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