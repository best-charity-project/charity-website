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
        this.getFiltersList();
      }
    render() {
        console.log(this.state)
        return (
            <div className="filters-content">
              {this.state.filtersEvents ?<FiltersForPages title = 'События' type = 'events' list = {this.state.filtersEvents} getNewFilterList = {this.getNewFilterList} />: null}
            {/* //  {this.state.filtersNews ? <FiltersForPages title = 'Новости' type = 'news' list = {this.state.filtersNews} getNewFilterList = {this.getNewFilterList} /> : null}
            //  {this.state.filtersProjects ? <FiltersForPages title = 'Проекты' type = 'projects' list = {this.state.filtersProjects} getNewFilterList = {this.getNewFilterList} /> :null} */}
               
            </div>  
        )
    }
    createFiltersLists = (res) => {
        alert('rfrf')
        let filterList = res.data.filterList;
        console.log(filterList)
        let filtersEvents = _.filter(filterList , function(el){
            if(el.type === 'events'){
                return el
            }
        })
        console.log(filtersEvents)
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
