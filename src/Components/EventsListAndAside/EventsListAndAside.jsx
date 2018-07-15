import React, {Component} from 'react';
import EventsAside from '../EventsAside/EventsAside';
import EventsList from '../EventsList/EventsList';
import './EventsListAndAside.css'
import { server } from "../../api";
import axios from 'axios';
import _ from 'lodash';

class EventsListAndAside extends Component {
    state = {
        currentSourse:'вce'
    }
    componentDidMount(){
        this.getEventsList();
        this.getFiltersList();
    };
    getCurrentFilter = (str) =>{
        (str ==='все') ? this.filterArray('') : this.filterArray(str);
    };
    render() {
        return (
            <div className = 'events-aside-list'>
                {this.state.filters ? 
                    <EventsAside 
                        filters = {this.state.filters}
                        getCurrentFilter = {this.getCurrentFilter} 
                        
                    />: null}
                <EventsList 
                    currentSourse = {this.state.currentSourse} 
                    name = "events-list" 
                    array = {this.state.filterArray}
                /> 
            </div>
        ) 
    }

    getEventsList = () => {
        fetch(`${server}/events`)
        .then(response => response.json())
        .then(data => {
            this.setState({events: data.events }, () => {
                this.filterArray('')
            });
        })
    };
    getFiltersList = () => {  
        axios({
            method: 'get',
            url: `${ server }/filters`,
        })
        .then(res =>{
            let filterList = res.data.filterList;
            let filtersEvents = _.filter(filterList , function(el){
                if(el.type === 'events'){
                    return el
                }
            })
            this.setState({
              filters:filtersEvents,
            })
        }) 
    };
    filterArray = (value) =>{
        if(value.length === 0){
            this.setState({filterArray : this.state.events}); 
        }else{
            let filterArray =this.state.events.filter (events => {
                return (events.filter === value)
           })
            this.setState({filterArray : filterArray });
        }
    }
}

export default EventsListAndAside;