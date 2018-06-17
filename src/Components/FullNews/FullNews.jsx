import React, {Component} from 'react';
import '../News/News.css';
import moment from 'moment';
import {NavLink} from "react-router-dom";
import { server } from '../../../src/api';
import Menu from '../Menu/Menu';
import '../FullNews/FullNews.css';
import Footer from '../Footer/Footer';

class FullNews extends Component {
    state = {
        news:{}
    }
    componentDidMount(){
        this.getInfoAboutNew()
    }
    render() {
        return (
            <div className = 'full-news-container'>
                <Menu name = 'full-news-menu'/>
                <div className = 'aside-and-text-full-news'>
                    <div className = 'aside-full-news'>
                        <p><NavLink to = '/news'> Новости </NavLink></p>    
                    </div>
                    <div className = 'full-news-list-container'>
                    {(this.state.news)? (<div className = 'full-news'>
                        {this.state.news.image ? 
                            <img src = {'http://localhost:3001/images/' + this.state.news.image} alt = 'image for news' /> :
                            null}
                        <p className = 'full-news-date'>{moment(this.state.news.createdAt).format('DD MMMM YYYY')} </p>
                        <p className = 'full-news-title'> {this.state.news.title}</p>               
                        <span dangerouslySetInnerHTML={{__html: this.state.news.fullText}}/>
                    </div>): null }
                    </div>
                </div>
                <Footer name = 'full-news-footer'/>
            </div>
        ) 
    }
    getInfoAboutNew = () =>{
        const id = this.props.match.params.id;
        fetch(`${server}/news/`+id)
        .then(response => response.json())
        .then(data => {
            this.setState({news:data.news });
        })
    }
}

export default FullNews;
