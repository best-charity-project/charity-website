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
                    <div>Дата создания</div>
                    <div>Опубликовано</div>
                    <div>Удалить новость</div>
                </div>
                <div>                    
                    {this.props.news.map(item => 
                            <AdminNews news = {item} key = {item._id}  deleteHandler = {() => this.props.deleteNews(item)}/>
                    )}
                </div>  
            </div>  
        )
    }
}

export default AdminNewsList;
