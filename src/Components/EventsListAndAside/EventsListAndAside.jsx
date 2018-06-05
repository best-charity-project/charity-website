import React, {Component} from 'react';
import NewsAside from '../NewsAside/NewsAside';
import NewsList from '../NewsList/NewsList';
import '../NewsListAndAside/NewsListAndAside.css'
class EventsListAndAside extends Component {
    state = {
        currentSourse:'Вce'
    }
    getCurrentSourse = (str) => {
        var newStr = str[0].toUpperCase() + str.slice(1);
        (newStr ==='Все')? this.setState({currentSourse:''}):this.setState({currentSourse:newStr});
    }
    render() {
        return (
            <div className = 'aside-and-menu'>
                <NewsAside getCurrentSourse = {this.getCurrentSourse}/>
                <NewsList currentSourse = {this.state.currentSourse} name = "news-list"/>
            </div>
        ) 
    }
}

export default EventsListAndAside;