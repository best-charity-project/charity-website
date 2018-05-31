import React, {Component} from 'react';
import '../News/News.css';
import moment from 'moment';
class News extends Component {
    
    render() {
        moment.lang('ru');
        return (
            <div id = {this.props.id} className = 'news'>
               <p className = 'news-date'>{moment(this.props.date).format('DD MMMM YYYY')} </p>
               <div className = 'news-text'>  
                   <p >{this.props.name} </p>
                   <span> {this.props.text}</span>
                </div>
              
            </div>
        ) 
    }
}

export default News;