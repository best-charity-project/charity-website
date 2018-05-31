import React, {Component} from 'react';
import './NewsImage.css';

class NewsImage extends Component {
    render() {
        return (
            <div className="news-image">
                <img src={this.props.image} />
            </div>
        ) 
    }
}

export default NewsImage;