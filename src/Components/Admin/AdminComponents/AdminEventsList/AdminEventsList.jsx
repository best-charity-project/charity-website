import React, {Component} from 'react';
import AdminEvent from '../AdminEvent/AdminEvent';
import './AdminEventsList.css';
import { server } from '../../../../api';

class AdminEventsList extends Component {
    state = {
        isLoading: true,
        error: null
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
                <div>                    
                    {(this.state.events)?
                        this.state.events.map(user => 
                        <AdminEvent 
                            event = {user} 
                            key = {user._id} 
                            deleteHandler = {() => this.deleteEvent(user)} 
                        />
                        ):null}
                </div>  
            </div>  
        )
    }
    deleteEvent = (user) => {
        let id = user._id
        fetch(`${ server }/api/events`, {
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
        fetch(`${ server }/api/events`)
            .then(response => response.json())
            .then(data => {
                this.setState({ events: data.events });
            })
            .catch(error => this.setState({ error, isLoading: false }));
    }
    }
export default AdminEventsList;