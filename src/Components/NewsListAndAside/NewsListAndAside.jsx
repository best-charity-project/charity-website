import React, {Component} from 'react';
import NewsAside from '../NewsAside/NewsAside';
import NewsList from '../NewsList/NewsList';
import '../NewsListAndAside/NewsListAndAside.css'
class NewsListAndAside extends Component {
    render() {
        return (
            <div className = 'aside-and-menu'>
                <NewsAside />
                <NewsList />
            </div>
        ) 
    }
}

export default NewsListAndAside;