import React, {Component} from 'react';
import FiltersForPages from  '../AdminFiltersForPages/AdminFiltersForPages';
import '../AdminFiltersContent/AdminFiltersContent.css';
import axios from 'axios';
import { server } from '../../../../api';
import _ from 'lodash';

class AdminFiltersContent extends Component {
    state = {
        filters :[]
    }
    componentDidMount(){
        this.getFiltersList();       
    }
    componentWillReceiveProps(curprops, nextprops){
        if(curprops.list != nextprops.list){
            this.setState ({filters:nextprops.list})
        }
    }
    getFiltersList = () => {  
        axios({
            method: 'get',
            url: `${ server }/api/filters`,
        })
        .then(res =>{
            this.createFiltersLists(res);
        })     
      }
    getNewFilterList = () => {
        setTimeout(this.getFiltersList,100);
      }
    render() {
        return (
            <div className="filters-content">
                {this.state.filtersEvents ? <FiltersForPages title = 'События' type = 'events' list = {this.state.filtersEvents} getNewFilterList = {this.getNewFilterList} /> : null }
                {this.state.filtersNews ? <FiltersForPages title = 'Новости' type = 'news' list = {this.state.filtersNews} getNewFilterList = {this.getNewFilterList} /> : null}
                {this.state.filtersProjects ? <FiltersForPages title = 'Проекты' type = 'projects' list = {this.state.filtersProjects} getNewFilterList = {this.getNewFilterList} /> :null}            
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
            filtersProjects:filtersProjects
        })
    }
}
export default AdminFiltersContent;
