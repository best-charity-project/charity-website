import React, {Component} from 'react';

import AdminForumInfo from '../AdminForumInfo/AdminForumInfo';
import AdminForumGroupsList from '../AdminForumGroupsList/AdminForumGroupsList';
import './AdminForumContent.css';

class AdminForumContent extends Component {
    state = {
        mode: '',
        isStateChanged: false
    }

    render() {
        return(
        <div className = 'admin-position-content'>
            <AdminForumInfo 
                changeMode = {this.changeMode}
                isStateChanged = {this.state.isStateChanged}
            />
            <div>
                <AdminForumGroupsList 
                    changeState = {this.changeState}
                />
            </div>
        </div>
        )
    }

    changeState = () => {
        this.setState({
            isStateChanged: !this.state.isStateChanged
        })
    }
}

export default AdminForumContent;