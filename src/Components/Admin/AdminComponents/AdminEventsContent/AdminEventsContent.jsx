import React, {Component} from 'react';
import AdminEventsList from '../AdminEventsList/AdminEventsList';
import Button from '../../../button/button';
import AdminCreateEvent from '../AdminCreateEvent/AdminCreateEvent';
import './AdminEventsContent.css';

class AdminEventsContent extends Component {
    state = {isOpen: false}
    render() {
        return(
                <div>
                    <div className="new-event">
                        <Button name = "button-admin" label = {'Создать'} clickHandler = {this.addEvent} />
                    </div>     
                    <AdminEventsList />  
                    
                    <div className={this.state.isOpen ? 'overlay' : 'overlay hidden'}>
                        <div className="modal-new-event-field">
                            <AdminCreateEvent cancel = {this.cancel} saveEvent = {this.saveEvent} />
                        </div>
                    </div>
                </div>
        )
    }
    addEvent = () => {
        this.setState({isOpen: true})
    }
    saveEvent = () => {
        this.setState({isOpen: false})
/*         + add to server */
    }
    cancel = () => {
        this.setState({isOpen: false})
    }
}
export default AdminEventsContent;