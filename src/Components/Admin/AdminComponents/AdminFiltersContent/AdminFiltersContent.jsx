import React, {Component} from 'react';
import FiltersForPages from  '../AdminFiltersForPages/AdminFiltersForPages';
import '../AdminFiltersContent/AdminFiltersContent.css';
import axios from 'axios';
import { server } from '../../../../api';
import _ from 'lodash';

class AdminFiltersContent extends Component {
    state = {
        filtersProjects : [],
        filtersNews : [],
        filtersProjects: [],
        a:false
    }
    componentDidMount(){
        this.getFiltersList();       
    }
    shouldComponentUpdate(nextProps, nextState){
        console.log(this.state)
        console.log(nextState)
        if(this.state != nextState){
            return true;
        }
        
        // if(this.props.list != nextprops.list){
        //     this.setState ({filters:nextprops.list})
        // }
    }
    getFiltersList = () => {  
        axios({
            method: 'get',
            url: `${ server }/filters`,
        })
        .then(res =>{
            this.createFiltersLists(res);
        })     
      }
    getNewFilterList = () => {
        this.setState({a:false})
        setTimeout(this.getFiltersList,10);
      }
    render() {
        console.log(this.state)
        return (
            <div className="filters-content">
            {this.state.a ? 
              <FiltersForPages title = 'События' type = 'events' list = {this.state.filtersEvents} getNewFilterList = {this.getNewFilterList} />
            //  {this.state.filtersNews ? <FiltersForPages title = 'Новости' type = 'news' list = {this.state.filtersNews} getNewFilterList = {this.getNewFilterList} /> : null}
            //  {this.state.filtersProjects ? <FiltersForPages title = 'Проекты' type = 'projects' list = {this.state.filtersProjects} getNewFilterList = {this.getNewFilterList} /> :null}
             : null    
        }
               
            </div>  
        )
    }
    createFiltersLists = (res) => {
        let filterList = res.data.filterList;
        let filtersEvents = _.filter(filterList , function(el){
            if(el.type === 'events'){
                return el
            }
        })
        let filtersNews = _.filter(filterList , function(el){
            if(el.type === 'news'){
                return el
            }
        })
        let filtersProjects = _.filter(filterList , function(el){
            if(el.type === 'projects'){
                return el
            }
        })
        this.setState({
            filtersEvents:filtersEvents,
            filtersNews:filtersNews,
            filtersProjects:filtersProjects,
            a:true
        }, () => {
            console.log(this.state.filtersEvents)
        } )
    }
}
export default AdminFiltersContent;
