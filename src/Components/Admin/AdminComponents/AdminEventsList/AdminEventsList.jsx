import React, {Component} from 'react';
import AdminEvent from '../AdminEvent/AdminEvent';
import './AdminEventsList.css';

class AdminEventsList extends Component {
    state = {
        isLoading: true,
        error: null
    }
    componentDidMount() {
        fetch('http://localhost:3001/api/admin-panel/events')
        .then(response => response.json())
        .then(data => {
            this.setState({events : data});
        })
        .catch(error => this.setState({ error, isLoading: false }))


        
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
                            deleteHandler = {() => this.deleteEvent(user.id)} 
                        />
    ):null}
                </div>  
            </div>  
        )
    }
    deleteEvent = (id) => {
        this.setState({
            events: this.state.events.filter(user => user.id !== id)
        })
    }
}

export default AdminEventsList;