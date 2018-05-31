import React, {Component} from 'react';
import moment from 'moment';
import './NewsDate.css';

class NewsDate extends Component {
    render() {
        return (
            <div className="news-date">
                {moment().format('DD-MM-YYYY')}
            </div>
        ) 
    }
}

export default NewsDate;