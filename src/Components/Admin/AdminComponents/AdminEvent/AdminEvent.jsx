import React, {Component} from 'react';
import Button from '../../../Button/Button';
import './AdminEvent.css';

class AdminEvent extends Component {
    render() {
        return (
            <div className="event-admin">
                <div>{this.props.event.name}</div>
                <div>{this.props.event.date}</div>
                <div>
                    <Button 
                        name = "button-admin admin-cancel" 
                        label = {<span aria-hidden="true">&times;</span>} 
                        clickHandler = {this.props.deleteHandler} 
                    />
                </div>
            </div>
        )
    }
}

export default AdminEvent;
