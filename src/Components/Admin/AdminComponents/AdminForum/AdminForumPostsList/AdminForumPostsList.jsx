import React, {Component} from 'react';
import axios from 'axios';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import {server} from '../../../../../api';
import Button from '../../../../Button/Button';
import TextField from '../../../../TextField/TextField';
import AdminNewsSearch from '../../AdminNewsSearch/AdminNewsSearch';
import rubbishImg from '../../../../../Assets/AssetsSvg/mbri-trash.svg';
import AdminForumPost from '../AdminForumPost/AdminForumPost';
import './AdminForumPostsList.css';

class AdminForumPostsList extends Component {
    state = {
        title: '',
        showPost: false,
        postInfo: ''
    }

    render() {
        return(
            <div className = 'forum-posts-list'>
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
                <div>Текущие ответы:</div>
                <div>
                    {this.props.posts.map(item => 
                        <AdminForumPost 
                            title = {item.title} 
                            id = {item._id}
                            key = {item._id}  
                            deleteHandler = {() => this.props.deletePost(item)} 
                            showPost= {this.getInfoPost}
                            checkId = {this.props.checkId}
                        />
                    )}
                </div>
                <div>
                    <span>Создать новый ответ</span>
                    <div>
                        <TextField 
                            label = 'Название'
                            type = 'text'
                            id = 'forum-post-title'
                            name = 'forum-post-title'
                            onKeyPress = {this.onKeyPress}
                        />                    
                    </div>
                </div>
            </div>
        )
    }
    onKeyPress  = (e) => {
        (e.charCode === 13)? this.addPost(): null;
    }
    addPost = () => {
        if(this.state.title){        
            this.createPost();
            this.props.getNewPostsList();
            this.setState({title: ''});
        }
    }
    createPost = () => {
        axios({
            method: 'post',
            url: `${ server }/forumPost`,
            data: this.state,
            config: { headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }},
        })
    }
    getInfoPost = (id) => {
        const URL = `${ server }/forumPost/`+id;
        fetch(URL)
        .then(response => response.json())
        .then(data => {
            this.setState({ postInfo: data.post });
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
export default AdminForumPostsList;