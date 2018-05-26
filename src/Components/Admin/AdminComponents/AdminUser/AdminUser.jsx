import React, {Component} from 'react';
import Button from '../../../Button/Button';
import './AdminUser.css';
const URL = 'http://localhost:3001';

class AdminUser extends Component {
    state = {
        isSubscribe: true,
        error: null
    }
    componentDidMount() {
        this.setState({isSubscribe: this.props.user.isSubscribeStatus})
    }
    render() {
        const {isSubscribe, error} = this.state;
        if (error) {
            return <p>{error.message}</p>
        }

        return (
            <div className={this.state.isSubscribe ? "admin-part-user" : "admin-part-user unsubscribed"}>
                <div>{this.props.user.email}</div>
                <Button 
                    name = "button-admin" 
                    label = {this.state.isSubscribe ? 'Отписать' : 'Подписать'} 
                    clickHandler = {this.handleClick} 
                />
            </div>
        ) 
    }
    handleClick = () => {
        fetch(URL + '/api/subscription/' + this.props.user._id + '/subscribe', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'cors'
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Something went wrong ...')
                }
            })
            .then(data => this.setState({isSubscribe: data.subscriber.isSubscribeStatus}))
            .catch(error => this.setState({error}))
    }
}

export default AdminUser;




               