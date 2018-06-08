import React, {Component} from 'react';
import Button from '../../../Button/Button';
import moment from 'moment';
import './AdminNews.css';

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
           <div className="news-admin" id = {this.props.news._id}>
               <div onClick = {this.props.showNews} className = 'news-admin-title'>{this.props.news.title}</div>
               <div readOnly>{moment(this.props.news.createdAt).format('DD-MM-YYYY')}</div>
               <div>{this.props.news.isPublic ? 'Да' : 'Нет'}</div>
               <div>
                   <Button
                       name = "button-admin admin-cancel"
                       label = {<span aria-hidden="true">&times;</span>}
                       clickHandler = {this.props.deleteHandler }
                   />
               </div>
           </div>
       )
    }
}

export default AdminNews;
