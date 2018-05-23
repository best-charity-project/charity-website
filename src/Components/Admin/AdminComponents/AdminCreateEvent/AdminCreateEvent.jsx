import React, {Component} from 'react';
import AdminDateEvent from '../AdminDateEvent/AdminDateEvent';
import AdminTextEvent from '../AdminTextEvent/AdminTextEvent';
import Button from '../../../Button/Button';
import TextField from '../../../TextField/TextField';
import './AdminCreateEvent.css';

class AdminCreateEvent extends Component {
    render() {
        return(
            <div>
                <AdminDateEvent /> 
                <div className="event-title">
                    <TextField 
                        id = "title" 
                        type = "text" 
                        name = "title" 
                        title = "Название события" 
                        nameClass = "event-title-input"
                    />
                </div>
                <AdminTextEvent />  
                <div className="change-state-buttons">  
                    <Button 
                        name = "button-admin button-admin-background" 
                        label = 'Сохранить' 
                        clickHandler = {this.props.saveEvent} 
                    />
                    <Button 
                        name = "button-admin button-admin-background" 
                        label = 'Отменить' 
                        clickHandler = {this.props.cancel} 
                    /> 
                </div> 
            </div>
        )
    }
}
export default AdminCreateEvent;