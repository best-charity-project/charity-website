import React, {Component} from 'react';
import Button from '../../../Button/Button';
import './AdminUser.css';

class AdminUser extends Component {
    state = {
        isSubscribe: true
    }
    render() {
        return (
            <div className={this.state.isSubscribe ? "admin-part-user" : "admin-part-user unsubscribed"}>
                <div>{this.props.user.login}</div>
                <Button 
                    name = "button-admin" 
                    label = {this.state.isSubscribe ? 'Отписать' : 'Подписать'} 
                    clickHandler = {this.handleClick} 
                />
            </div>
        ) 
    }
    handleClick = () => {
        this.setState({
            isSubscribe: !this.state.isSubscribe
        })
    }
}

export default AdminUser;




               