import React, {Component} from 'react';
import NewsAside from '../NewsAside/NewsAside';
import NewsList from '../NewsList/NewsList';
import '../NewsListAndAside/NewsListAndAside.css';


class NewsListAndAside extends Component {
    state = {
        filterArray:this.props.array
    }
    componentWillReceiveProps(nextprops){
        if(nextprops.array!=this.props.array){
            this.setState({filterArray:nextprops.array})
        }
    }
    getCurrentSourse = (str) => {
        var newStr = str[0].toUpperCase() + str.slice(1); 
        this.props.getNewSourse(newStr)       
    }

    render() {
        return (
            <div className = 'aside-and-menu'>
                <NewsAside getCurrentSourse = {this.getCurrentSourse} listSourse = {this.props.listSourse}/>
                <NewsList currentSourse = {this.state.currentSourse} name = "news-list" array = {this.state.filterArray} />
            </div>
        ) 
    }
}

export default NewsListAndAside;