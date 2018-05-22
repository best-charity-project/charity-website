import React, {Component} from 'react';
import AdminEvent from '../AdminEvent/AdminEvent';
import './AdminEventsList.css';
const URL = 'https://api.github.com/users';

class AdminEventsList extends Component {
    state = {
        events: [], 
        isLoading: false,
        error: null
    }
    componentDidMount() {
        this.setState({ isLoading: true })

        fetch(URL)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => this.setState({events: data, isLoading: false}))
            .catch(error => this.setState({ error, isLoading: false }))
    }

    render() {
        const {events, isLoading, error} = this.state;
        if (isLoading) {
            return <p>Loading ...</p>
        }

        if (error) {
            return <p>{error.message}</p>
        }
        
        return (
            <div className="events-list-admin">
                    <div className="events-list-header">
                        <div>Название события</div>
                        <div>Дата проведения</div>
                        <div>Удалить событие</div>
                    </div>

                <div>
                    {events.map(user => 
                        <AdminEvent event = {user} key = {user.id} deleteHandler = {() => this.deleteEvent(user.id)} />
                    )}
                </div>  
            </div>  
        )
    }
    deleteEvent = (id) => {
        this.setState({
            events: this.state.events.filter(user => user.id !== id)
           /*  + delete from back */
        })
    };
}

export default AdminEventsList;
