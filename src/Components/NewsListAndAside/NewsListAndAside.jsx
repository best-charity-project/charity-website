import React, {Component} from 'react';
import NewsAside from '../NewsAside/NewsAside';
import NewsList from '../NewsList/NewsList';
import '../NewsListAndAside/NewsListAndAside.css'
class NewsListAndAside extends Component {
    state = {
        currentSourse:'rgrtgrtgrg'
    }
    getCurrentSourse = (str) => {
        console.log(str);
        this.setState({currentSourse:str})
    }
    render() {
        return (
            <div className = 'aside-and-menu'>
                <NewsAside getCurrentSourse = {this.getCurrentSourse}/>
                <NewsList currentSourse = {this.state.currentSourse}/>
            </div>
        ) 
    }
}

export default NewsListAndAside;