import React, {Component} from 'react';
import AdminEventsList from '../AdminEventsList/AdminEventsList';
import Button from '../../../Button/Button';
import AdminCreateEvent from '../AdminCreateEvent/AdminCreateEvent';
import './AdminEventsContent.css';
import "../../../../App.css";
import Navigation from '../../../Navigation/Navigation';
import NavBar from '../../../NavBar/NavBar';
import { server } from "../../../../api"

class AdminEventsContent extends Component {
    state = {
        isOpen: false,
    }
    componentDidMount(){
       this.getList()
    }
    render() {
        return(
            <div>
            <Navigation onLogout={this.onLogout} />
                <NavBar />
            <div className="list-container">
                <div className="new-event">
                    <Button 
                        name = "button-admin" 
                        label = {'Создать'} 
                        clickHandler = {this.addEvent} 
                    />
                </div>     
               {(this.state.events)?<AdminEventsList events = {this.state.events} getUpdateEventsList = {this.getUpdateEventsList}/> : null} 
                <div className={this.state.isOpen ? 'overlay' : 'overlay hidden'}>
                    <div className="modal-new-event-field">
                        <AdminCreateEvent cancel = {this.cancel} saveEvent = {this.saveEvent} />
                    </div>
                </div>
            </div>
            </div>
        )
    }
    getList =()=>{
        fetch(`${ server }/events`)
        .then(response => response.json())
        .then(data => {         
              this.setState({ events: data.events }              
            )})
        .catch(error => this.setState({ error, isLoading: false }));
    }
    getUpdateEventsList = () =>{
        setTimeout(this.getList,100)
    }
    addEvent = () => {
        this.setState({isOpen: true});        
    }
    saveEvent = () => {
        setTimeout(this.getList,0)
        this.setState({isOpen: false})
    }
    cancel = () => {
        this.setState({isOpen: false})
    }
}

export default AdminEventsContent;