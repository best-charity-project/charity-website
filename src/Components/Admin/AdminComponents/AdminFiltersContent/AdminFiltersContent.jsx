import React, { Component } from 'react';
import FiltersForPages from '../AdminFiltersForPages/AdminFiltersForPages';
import '../AdminFiltersContent/AdminFiltersContent.css';
import axios from 'axios';
import { server } from '../../../../api';
import _ from 'lodash';

class AdminFiltersContent extends Component {
    state = {
        filtersEvents: [],
        filtersNews: [],
        filtersProjects: [],
        filtersLibrary: []
    }
    componentDidMount() {
        this.getFiltersList();
    };

    getFiltersList = () => {
        axios({
            method: 'get',
            url: `${server}/api/filters`,
        })
            .then(res => this.createFiltersLists(res));
    };

    createFiltersLists = (res) => {
        let filtersList = res.data.filterList;
        let filtersEvents = _.filter(filtersList, function (el) {
            if (el.type === 'events') {
                return el
            }
        });
        let filtersNews = _.filter(filtersList, function (el) {
            if (el.type === 'news') {
                return el
            }
        });
        let filtersProjects = _.filter(filtersList, function (el) {
            if (el.type === 'projects') {
                return el
            }
        });

        const filtersLibrary = filtersList.filter(filter => filter.type === 'library');

        this.setState({
            filtersEvents: filtersEvents,
            filtersNews: filtersNews,
            filtersProjects: filtersProjects,
            filtersLibrary
        });
    };

    render() {
        return (
            <div className="filters-content">
                {this.state.filtersEvents.length ?
                    <FiltersForPages
                        title='События'
                        type='events'
                        list={this.state.filtersEvents}
                    /> : null}
                {this.state.filtersNews.length ?
                    <FiltersForPages
                        title='Новости'
                        type='news'
                        list={this.state.filtersNews}
                    /> : null}
                {this.state.filtersProjects.length ?
                    <FiltersForPages
                        title='Проекты'
                        type='projects'
                        list={this.state.filtersProjects}
                    /> : null}
                    <FiltersForPages
                    title='Библиотека'
                    type='library'
                    list={this.state.filtersLibrary} />
            </div>
        )
    }
}
export default AdminFiltersContent;
