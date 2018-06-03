import React, {Component} from 'react';
import Button from '../../../Button/Button';
import moment from 'moment';
import './AdminNews.css';
const URL = 'http://localhost:3001';

class AdminNews extends Component {
    state = {
        error: null
    }
   render() {
        const {error} = this.state;
        if (error) {
            return <p>{error.message}</p>
        }
       return (
           <div className="news-admin">
               <div>{this.props.news.title}</div>
               <div readOnly>{moment(this.props.news.createdAt).format('DD-MM-YYYY')}</div>
               <div>{this.props.news.isPublic ? 'Да' : 'Нет'}</div>
               <div>
                   <Button
                       name = "button-admin admin-cancel"
                       label = {<span aria-hidden="true">&times;</span>}
                       clickHandler = {this.deleteHandler}
                   />
               </div>
           </div>
       )
    }
/*     deleteHandler = () => {
        fetch(URL + '/api/news/' + this.props.news._id, {
            method: 'DELETE',
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
    } */
    
    //todo: confirm 
}

export default AdminNews;
