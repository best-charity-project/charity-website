import React, {Component} from 'react';
import '../News/News.css';
import moment from 'moment';
import {NavLink} from "react-router-dom";
import FullNews from '../FullNews/FullNews';

class News extends Component {
    Click = () => {
        <FullNews />
    }
    render() {
        moment.lang('ru');
        return (
            <div id = {this.props.id} className = 'news' onClick = {this.Click}>
                {(!this.props.event)?(
                        <NavLink to={`/news/${this.props.id}`} >
                            <p className = 'news-date'>{moment(this.props.date).format('DD MMMM YYYY')} </p>
                            {this.props.img?<img src = {`http://localhost:3001/images/${this.props.img}`} alt = 'image for news' />: null}
                            <p className = 'news-title'>{this.props.name} </p>
                            <span className = 'news-text' dangerouslySetInnerHTML={{__html: this.props.text}}/>                
                        </NavLink>):(
                        <div>
                             <p className = 'news-date'>{moment(this.props.dateStart).format('DD MMMM YYYY') !== moment(this.props.dateEnd).format('DD MMMM YYYY') ? 
                             `${moment(this.props.dateStart).format('DD MMMM YYYY, h:mm')} - ${moment(this.props.dateEnd).format('DD MMMM YYYY, h:mm')}` : 
                             ` ${moment(this.props.dateStart).format('DD MMMM YYYY, h:mm')} - ${moment(this.props.dateEnd).format('h:mm')}`} </p>
                            <p className = 'news-title'>{this.props.name} </p>
                            <span className = 'news-text' dangerouslySetInnerHTML={{__html: this.props.text}}/>   
                        </div>
                 )}
            </div>
        ) 
    }
}

export default News;