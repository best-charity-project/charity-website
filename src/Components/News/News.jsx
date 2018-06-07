import React, {Component} from 'react';
import '../News/News.css';
import moment from 'moment';
import {NavLink} from "react-router-dom";
import FullNew from '../FullNew/FullNew'
class News extends Component {
    Click = () => {
        <FullNew />
    }
    render() {
        moment.lang('ru');
        return (
            <div id = {this.props.id} className = 'news' onClick = {this.Click}>
                {(!this.props.event)?(
                        <NavLink to={`/news/${this.props.id}`} >
                            <p className = 'news-date'>{moment(this.props.date).format('DD MMMM YYYY')} </p>
                            <img src = {this.props.img} alt = 'image for new' />
                            <p className = 'new-title'>{this.props.name} </p>
                            <span className = 'new-text'> {this.props.text}</span>                
                        </NavLink>):(
                        <div>
                            <p className = 'news-date'>{moment(this.props.date).format('DD MMMM YYYY')} </p>
                            <p className = 'new-title'>{this.props.name} </p>
                            <span className = 'new-text'> {this.props.text}</span>   
                        </div>
                 )}
            </div>
        ) 
    }
}

export default News;