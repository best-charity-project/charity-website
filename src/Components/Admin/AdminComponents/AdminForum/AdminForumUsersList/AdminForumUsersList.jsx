import React, {Component} from 'react';
import axios from 'axios';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import {server} from '../../../../../api';
import Button from '../../../../Button/Button';
import TextField from '../../../../TextField/TextField';
import AdminNewsSearch from '../../AdminNewsSearch/AdminNewsSearch';
import rubbishImg from '../../../../../Assets/AssetsSvg/mbri-trash.svg';
import AdminForumUser from '../AdminForumUser/AdminForumUser';
import './AdminForumUsersList.css';

class AdminForumUsersList extends Component {
    state = {
        title: '',
        showUser: false,
        userInfo: ''
    }

    render() {
        return(
            <div className = 'forum-users-list'>
                <div className = 'admin-main-forum'>
                    <AdminNewsSearch findNews = {this.findTitle} /> 
                </div>  
                <Button
                    name = "delete-something" 
                    clickHandler = {this.submit}
                    disabled = {this.state.checkedIds.length ? false : true}
                    label = {<div>
                                <img src={rubbishImg} alt='' />
                                <span>Удалить</span>
                            </div>}
                />
                <div>Текущие пользователи:</div>
                <div>
                    {this.props.users.map(item => 
                        <AdminForumUser 
                            title = {item.title} 
                            id = {item._id}
                            key = {item._id}  
                            deleteHandler = {() => this.props.deleteUser(item)} 
                            showUser= {this.getInfoUser}
                            checkId = {this.props.checkId}
                        />
                    )}
                </div>
                <div>
                    <span>Создать нового пользователя</span>
                    <div>
                        <TextField 
                            label = 'Пользователь'
                            type = 'text'
                            id = 'forum-user-title'
                            name = 'forum-user-title'
                            onKeyPress = {this.onKeyPress}
                        />                    
                    </div>
                </div>
            </div>
        )
    }
    onKeyPress  = (e) => {
        (e.charCode === 13)? this.addUser(): null;
    }
    addUser = () => {
        if(this.state.title){        
            this.createUser();
            this.props.getNewUsersList();
            this.setState({title: ''});
        }
    }
    createUser = () => {
        axios({
            method: 'post',
            url: `${ server }/forumUser`,
            data: this.state,
            config: { headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }},
        })
    }
    getInfoUser = (id) => {
        const URL = `${ server }/forumUser/`+id;
        fetch(URL)
        .then(response => response.json())
        .then(data => {
            this.setState({ userInfo: data.user });
        })
    }
    deleteGroup = (group) =>{
        let id = group._id
        axios({
            method: 'delete',
            url: `${server}/forumGroup/` + id,
            data: group,
            config: { headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }}
        })
        .then((result) => {
            this.setState({            
                filteredGroups: this.state.filteredGroups.filter(item => item._id !== result.data.forumGroup._id)
            }) 
        })
        .catch((error) => {
            console.log(error);
        });
    } 
    checkId = (id) => {
        let tempId = this.state.checkedIds;
        if (~this.state.checkedIds.indexOf(id)) {
            tempId.splice(tempId.indexOf(id), 1)
        } else {
            tempId.push(id)
        }
        this.setState({checkedIds: tempId})
    }
    submit = () => {
        confirmAlert({
          title: 'Подтвердите удаление группы',
          message: 'Вы точно хотите удалить ' + this.state.checkedIds.length + ' групп(ы)?',
          buttons: [
            {
              label: 'Да',
              onClick: (item) => this.deleteChosenGroups(item)
            },
            {
              label: 'Нет',
              onClick: () => {}
            }
          ]
        })
    }
    deleteChosenGroups = (groups) => {
        axios({
            method: 'delete',
            url: `${server}/forumGroup`,
            data: {'checkedIds': this.state.checkedIds},
            config: { headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }}
        })
        .then((result) => {
            this.setState({            
                filteredGroups: this.state.filteredGroups.filter(forumGroups => !~result.data.forumGroups.indexOf(forumGroups._id)),
                checkedIds: []
            }) 
        })
        .catch(function (error) {
            console.log(error);
        });
    } 
    findTitle = (title) => {
        if(!title) {
            fetch(`${server}/forumGroup`, {
                method: 'GET', 
                mode: 'cors'
                })
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error('Something went wrong ...')
                    }
                })
                .then(data => this.setState({filteredGroups: data.forumGroups}))
                .catch(error => this.setState({error}))
        } else {
            const {groups} = this.state
            this.setState({
                filteredGroups: groups.filter((item) => {
                    return item.title.toLowerCase().includes(title)
                })
            })
        }
    }
}
export default AdminForumUsersList;