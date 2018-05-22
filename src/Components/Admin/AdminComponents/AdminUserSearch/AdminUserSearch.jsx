import React, {Component} from 'react';
import Input from '../../../input/Input'
import './AdminUserSearch.css';
import searchImg from '../../../../Assets/images/Search.svg';

class AdminUserSearch extends Component {
    render() {
        return (
            <div className="search-user">
                <img src={searchImg}/>
                <Input type="search" nameClass="admin-search-input" clickHandler={this.onSearch} placeholder="Поиск пользователя" />
            </div>
        )
    }
    onSearch = (event) => {
        this.props.findUser(event.target.value.toLowerCase());
    }
}

export default AdminUserSearch;