import React, {Component} from 'react';
import AdminNews from '../AdminNews/AdminNews';
import './AdminNewsList.css';
import { server } from '../../../../api';
import {withRouter} from "react-router-dom";
class AdminNewsList extends Component {
        state = {
            showNews:false,
            newsInfo : ''
        }
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
                            <AdminNews news = {item} key = {item._id}  deleteHandler = {() => this.props.deleteNews(item)} showNews= {this. getInfoNews}/>
                    )}
                </div>  
            </div>  
        )
    }
    getInfoNews = (e) => {
        let id = e.target.parentNode.id;
        const URL = `${ server }/news/`+id;
        fetch(URL)
        .then(response => response.json())
        .then(data => {
            this.setState({ newsInfo: data.news } ,() => {

        });
            this.props.history.push({
                pathname: '/admin-panel/news/create',
                state: { detail: this.state.newsInfo}
              })
        })

    }
}

export default withRouter(AdminNewsList);
