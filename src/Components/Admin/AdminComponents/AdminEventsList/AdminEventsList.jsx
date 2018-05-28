import React, {Component} from 'react';
import AdminEvent from '../AdminEvent/AdminEvent';
import './AdminEventsList.css';
import EventInfo from '../AdminEventInfo/AdminEventInfo'

class AdminEventsList extends Component {
    state = {
        isLoading: true,
        error: null,
        getEventInfo : false,
        eventInfo:{}
    };
    componentDidMount() {
        this.updateEventsList();
    }
    componentWillUpdate() {
        this.updateEventsList();
    }


    render() {
        return (
            <div className="events-list-admin">
                <div className="events-list-header">
                    <div>Название события</div>
                    <div>Дата проведения</div>
                    <div>Удалить событие</div>
                </div>
                <div className={this.state.getEventInfo ? 'event-info-container' : 'without-info'}>
                <EventInfo event = {this.state.eventInfo} closeInfo = {this.closeInfo}/>
                </div>
                <div>                    
                    {(this.state.events)?
                        this.state.events.map(user => 
                        <AdminEvent 
                        clickHandler = {this. getEventInfo }
                            event = {user} 
                            key = {user._id} 
                            deleteHandler = {() => this.deleteEvent(user)
                            
                            } 
                        />
                        
                        ):null}
                </div>  
            </div>  
        )
    }
    deleteEvent = (user) => {
        let id = user._id
        fetch('http://localhost:3001/api/events', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'cors',
            body: JSON.stringify(user),
        })
            this.setState({            
                events: this.state.events.filter(user => user._id !== id)
            })
            
      };
      updateEventsList() {
        fetch('http://localhost:3001/api/events')
            .then(response => response.json())
            .then(data => {
                this.setState({ events: data.events });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }
    getEventInfo = (e) => {
        this.setState({getEventInfo: !this.state.getEventInfo});
        let id = e.target.parentNode.id;
        const URL = 'http://localhost:3001/api/events/'+id;
        fetch(URL)
        .then(response => response.json())
        .then(data => {
            this.setState({ eventInfo: data });
        })
        .catch(error => this.setState({ error, isLoading: false }));
        
    }
    closeInfo = (str) => {
        this.setState({getEventInfo : false})
    }
    }
export default AdminEventsList;