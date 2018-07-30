import React, {Component} from 'react';
import TextField from '../../../TextField/TextField';
import './AdminNewsSearch.css';
import searchImg from '../../../../../src/Assets/AssetsSvg/Search.svg';

class AdminNewsSearch extends Component {
    render() {
        return (
            <div key="news-search" className = 'search-news'>
                <img src = {searchImg} alt = '' />
                <TextField 
                    key = {this.props.inputKey ? this.props.inputKey : "news-search-input"}
                    type = 'search'
                    nameClass = 'admin-search-input' 
                    onChangeValue = {this.onSearch} 
                    placeholder = 'Поиск'
                />
            </div>
        )
    }
    onSearch = (v) => {
        this.props.findNews(v.value.toLowerCase());
    }


}

export default AdminNewsSearch;