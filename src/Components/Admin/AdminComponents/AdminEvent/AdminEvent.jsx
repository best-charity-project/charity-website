import React, {Component} from 'react';
import Button from '../../../button/button';
import './AdminEvent.css'

class AdminEvent extends Component {
    render() {
        return (
            <div className="event-admin">
                <div>{this.props.event.login}</div>
                <div>{this.props.event.id}</div>
                <div>
                    <Button name = "button-admin admin-cancel" label = {<span aria-hidden="true">&times;</span>} clickHandler = {this.props.deleteHandler} />
                </div>
            </div>

        )
    }
}

export default AdminEvent;
