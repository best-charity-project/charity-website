import React, {Component} from 'react';
import AdminEvent from '../AdminEvent/AdminEvent';
import './AdminEventsList.css';
<<<<<<< HEAD
import EventInfo from '../AdminEventInfo/AdminEventInfo';
=======
import { server } from '../../../../api';
>>>>>>> new-version-create-react-app

class AdminEventsList extends Component {
    state = {    
        events:this.props.events,  
        isLoading: true,
        error: null,
        getEventInfo : false,
        eventInfo:null
    };
componentWillReceiveProps(nexprops, nextstate){

    if(nexprops.length != this.state.events.length){
        this.setState({events:nexprops.events})
    }
}
    render() {
        return (
            <div className="events-list-admin">
                <div className="events-list-header">
                    <div>Название события</div>
                    <div>Дата проведения</div>
                    <div>Удалить событие</div>
                </div>            
                
                <div>                    
                    {
                        this.state.events.map(user => 
                        <AdminEvent 
                        clickHandler = {this. getEventInfo }
                            event = {user} 
                            key = {user._id} 
                            deleteHandler = {() => this.deleteEvent(user)                            
                            } 
                        />                        
                        )}
                   {(this.state.eventInfo)? (<div className={this.state.getEventInfo ? 'event-info-container' : 'without-info'}>
                        <EventInfo event = {this.state.eventInfo} closeInfo = {this.closeInfo}/>
                    </div>): null}
                </div>  
            </div>  
        )
    }
    deleteEvent = (user) => {
        let id = user._id
        fetch(`${ server }/events`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            this.setState({            
                events: this.state.events.filter(user => user._id !== id)
            })  
      };
<<<<<<< HEAD

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
        this.setState({getEventInfo : false, eventInfo:null});
        this.props.getUpdateEventsList();
=======
      updateEventsList() {
        fetch(`${ server }/events`)
            .then(response => response.json())
            .then(data => {
                this.setState({ events: data.events });
            })
            .catch(error => this.setState({ error, isLoading: false }));
>>>>>>> new-version-create-react-app
    }
    }
export default AdminEventsList;