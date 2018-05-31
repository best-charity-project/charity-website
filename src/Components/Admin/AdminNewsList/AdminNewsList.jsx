import React, {Component} from 'react';
import AdminNews from '../AdminNews/AdminNews';
import './AdminNewsList.css';
const URL = 'http://localhost:3001/api/news'

class AdminNewsList extends Component {
    render() {
        return (
            <div className="news-list-admin">
                <div className="news-list-header">
                    <div>Название новости</div>
                    <div>Дата публикации</div>
                    <div>Статус</div>
                    <div>Удалить новость</div>
                </div>
                <div>                    
                    {this.props.news.map(item => 
                            <AdminUser news = {item} key = {item._id} />
                    )}
                </div>  
            </div>  
        )
    }
}

export default AdminNewsList;
