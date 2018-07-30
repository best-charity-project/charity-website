import React, {Component} from 'react';

import AdminForumInfo from '../AdminForumInfo/AdminForumInfo';
import AdminForumGroupsList from '../AdminForumGroupsList/AdminForumGroupsList';
// import AdminForumTopicsList from '../AdminForumTopicsList/AdminForumTopicsList';
// import AdminForumPostsList from '../AdminForumPostsList/AdminForumPostsList';
// import AdminForumUsersList from '../AdminForumUsersList/AdminForumUsersList';
import './AdminForumContent.css';

class AdminForumContent extends Component {
    state = {
        mode: '',
        isStateChanged: false
    }

    // componentDidMount() {
    //     this.setState({
    //         mode: 'groups'
    //     })
    // }

    render() {
        // let renderedComponent;
        // if(this.state.mode === 'groups') {
        //     renderedComponent = 
        //     <AdminForumGroupsList 
        //         changeState = {this.changeState}
        //     />
        // } else if(this.state.mode === 'topics') {
        //     renderedComponent = 
        //     <AdminForumTopicsList />
        // } else if(this.state.mode === 'posts') {
        //     renderedComponent = 
        //     <AdminForumPostsList />
        // } else if(this.state.mode === 'users') {
        //     renderedComponent = 
        //     <AdminForumUsersList />
        // }
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

    // changeMode = (str) => {
    //     this.setState({
    //         mode: str
    //     })
    // }
    changeState = () => {
        this.setState({
            isStateChanged: !this.state.isStateChanged
        })
    }
}

export default AdminForumContent;