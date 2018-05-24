import React, {Component} from 'react';
import TextField from '../../../TextField/TextField';
import './AdminUserSearch.css';
import searchImg from '../../../../../src/Assets/AssetsSvg/Search.svg';

class AdminUserSearch extends Component {
    render() {
        return (
            <div className="search-user">
                <img src={searchImg} />
                <TextField 
                    type="search" 
                    nameClass="admin-search-input" 
                    onChangeValue={this.onSearch} 
                    placeholder="Поиск пользователя" 
                />
            </div>
        )
    }
    onSearch = (value) => {
        this.props.findUser(value.toLowerCase());
    }
}

export default AdminUserSearch;