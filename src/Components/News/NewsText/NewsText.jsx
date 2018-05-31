import React, {Component} from 'react';
import './NewsText.css';

class NewsText extends Component {
    render() {
        return (
            <div className="news-preview">
                <div className="news-title">{this.props.title}</div>
                <div className="news-text">{this.props.text}</div>
            </div>
        ) 
    }
}

export default NewsText;