import React, { Component } from 'react';
import NewsAside from '../NewsAside/NewsAside';
import LibraryList from '../LibraryList/LibraryList';
import { server } from "../../api";
import axios from 'axios';

class LibraryListAndAside extends Component {
    state = {
        materials: [],
        filters: [],
        filterArray: []
    }
    componentDidMount() {
        this.getMaterials();
        this.getFiltersList();
    };
    getCurrentFilter = (str) => {
        (str === 'все') ? this.filterArray('') : this.filterArray(str);
    };

    getMaterials = () => {
        axios({
            url: `${server}/api/materials`
        })
            .then(res => {
                this.setState({ materials: res.data.materials }, () => {
                    this.filterArray('')
                });
            });
    };
    getFiltersList = () => {
        axios({
            method: 'get',
            url: `${server}/api/filters`,
        })
            .then(res => {
                let filterList = res.data.filterList;
                let filters = filterList.filter(el => el.type === 'library');
                this.setState({
                    filters
                })
            })
    };

    filterArray = (value) => {
        if (value.length === 0) {
            this.setState({ filterArray: this.state.materials });
        } else {
            const filterArray = this.state.materials.filter(material => material.filter === value);
            this.setState({ filterArray });
        };
    };

    showFilters() {
        if (!this.state.filters.length) return;
        return <NewsAside
            name='events-page-aside'
            filters={this.state.filters}
            getCurrentFilter={this.getCurrentFilter}
        />
    }

    render() {
        return (
            <div className='events-aside-list library-aside-list'>
                {this.showFilters()}
                <LibraryList
                    name="events-list"
                    array={this.state.filterArray}
                />
            </div>
        )
    }

}

export default LibraryListAndAside;
