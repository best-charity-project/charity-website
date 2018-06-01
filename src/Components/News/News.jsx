import React, {Component} from 'react';
import '../News/News.css';
import moment from 'moment';
import {Link,Switch,NavLink} from "react-router-dom";
import FullNew from '../FullNew/FullNew'
class News extends Component {
    Click = () => {
        <FullNew />
    }
    render() {
        moment.lang('ru');
        return (
            <div id = {this.props.id} className = 'news' onClick = {this.Click}>
                <NavLink to={`/news/${this.props.id}`} >
               <p className = 'news-date'>{moment(this.props.date).format('DD MMMM YYYY')} </p>
               <div className = 'news-text'>  
                   <p >{this.props.name} </p>
                   <span> {this.props.text}</span>
                   
                </div>
                </NavLink>
            </div>
        ) 
    }
}

export default News;
// 