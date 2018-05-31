import React, {Component} from 'react';
import News from '../News/News';
import './NewsList.css';

class NewsList extends Component {
    render() {
        return (
            <div className="news-list">
                  {this.props.news.map(item => 
                        <News news = {item} key = {item._id} />
                    )}
            </div>
        ) 
    }
}

export default NewsList;