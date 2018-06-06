import React, {Component} from 'react';
import TextField from '../../../TextField/TextField';
import './AdminNewsSearch.css';
import searchImg from '../../../../../src/Assets/AssetsSvg/Search.svg';

class AdminNewsSearch extends Component {
    render() {
        return (
            <div className="search-news">
                <img src={searchImg} />
                <TextField 
                    type="search" 
                    nameClass="admin-search-input" 
                    onChangeValue={this.onSearch} 
                    placeholder="Поиск" 
                />
            </div>
        )
    }
    onSearch = (value) => {
        this.props.findNews(value.toLowerCase());
    }
}

export default AdminNewsSearch;