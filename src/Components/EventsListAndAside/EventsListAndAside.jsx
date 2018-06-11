import React, {Component} from 'react';
import EventsAside from '../EventsAside/EventsAside';
import EventsList from '../EventsList/EventsList';
import './EventsListAndAside.css'
import { server } from "../../api";
class EventsListAndAside extends Component {
    state = {
        currentSourse:'Вce'
    }
    componentDidMount(){
        this.getEventsList();
    }
    getCurrentSourse = (str) => {
        var newStr = str[0].toUpperCase() + str.slice(1);
        (newStr ==='Все')? this.setState({currentSourse:''}, () => {
            this.filterArray('')
        }):this.setState({currentSourse:newStr} , () => {
            this.filterArray(this.state.currentSourse)
        });        
    }

    render() {
        return (
            <div className = 'events-aside-list'>
                <EventsAside 
                    getCurrentSourse = {this.getCurrentSourse} 
                    listSourse = {['все','организаторы', 'спонсоры','активисты','волонтеры']} 
                />
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
      }
      
      filterArray = (value) =>{
        if(value.length === 0){
            this.setState({filterArray : this.state.events}) 
        }else{
            let filterArray =this.state.events.filter (event => {
                return (event.source === value)
           })
         this.setState({filterArray :filterArray })
        }
      }
}

export default EventsListAndAside;