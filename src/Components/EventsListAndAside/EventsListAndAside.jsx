import React, {Component} from 'react';
// import NewsAside from '../NewsAside/NewsAside';
// import NewsList from '../NewsList/NewsList';
// import '../NewsListAndAside/NewsListAndAside.css';
import { server } from "../../api";
class EventsListAndAside extends Component {
    state = {
        currentSourse:'Вce'
    }
    componentDidMount(){
        this.getEventsList()
    }
    getCurrentSourse = (str) => {
        var newStr = str[0].toUpperCase() + str.slice(1);
        (newStr ==='Все')? this.setState({currentSourse:''}):this.setState({currentSourse:newStr});
    }
    render() {
        console.log(this.state)
        return (
            <div className = 'aside-and-menu'>
            Events
                {/* <NewsAside getCurrentSourse = {this.getCurrentSourse}/>
                <NewsList currentSourse = {this.state.currentSourse} name = "news-list"/> */}
            </div>
        ) 
    }
    getEventsList = () => {
        fetch(`${ server }/events`)
        .then(response => response.json())
        .then(data => {         
              this.setState({ events: data.events }              
            )})
        .catch(error => this.setState({ error, isLoading: false }));
    }
}

export default EventsListAndAside;