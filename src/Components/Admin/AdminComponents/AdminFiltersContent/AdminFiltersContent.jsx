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
        filtersProjects: []
    }
    componentDidMount(){
        this.getFiltersList();       
    }

    render() {
        console.log(this.state)
        return (
            <div className="filters-content">
                {this.state.filtersEvents ?
                    <FiltersForPages
                        title = 'События' 
                        type = 'events' 
                        list = {this.state.filtersEvents} 
                        /> : null}
                {this.state.filtersNews ? 
                    <FiltersForPages 
                        title = 'Новости' 
                        type = 'news' 
                        list = {this.state.filtersNews}
                    /> : null}
                {this.state.filtersProjects ? 
                    <FiltersForPages 
                        title = 'Проекты' 
                        type = 'projects' 
                        list = {this.state.filtersProjects} 
                    /> :null}               
            </div>  
        )
    }

    getFiltersList = () => {  
        axios({
            method: 'get',
            url: `${ server }/filters`,
        })
        .then(res =>this.createFiltersLists(res));     
      };
    createFiltersLists = (res) => {
        let filtersList = res.data.filterList;
        let filtersEvents = _.filter(filtersList , function(el){
            if(el.type === 'events'){
                return el
            }
        });
        let filtersNews = _.filter(filtersList , function(el){
            if(el.type === 'news'){
                return el
            }
        });
        let filtersProjects = _.filter(filtersList , function(el){
            if(el.type === 'projects'){
                return el
            }
        });
        this.setState({
            filtersEvents:filtersEvents,
            filtersNews:filtersNews,
            filtersProjects:filtersProjects
        });
    }
}
export default AdminFiltersContent;
