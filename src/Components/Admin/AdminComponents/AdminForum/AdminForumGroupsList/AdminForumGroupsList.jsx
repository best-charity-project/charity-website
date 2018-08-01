import React, {Component} from 'react';
import axios from 'axios';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import {server} from '../../../../../api';
import Button from '../../../../Button/Button';
import AdminNewsSearch from '../../AdminNewsSearch/AdminNewsSearch';
import rubbishImg from '../../../../../Assets/AssetsSvg/mbri-trash.svg';
import plusImg from '../../../../../Assets/AssetsSvg/mbri-plus.svg';
import AdminForumGroup from '../AdminForumGroup/AdminForumGroup';
import AdminForumModalWindow from '../AdminForumModalWindow/AdminForumModalWindow'
import './AdminForumGroupsList.css';

class AdminForumGroupsList extends Component {
    state = {
        title: '',
        checkedGroupsIds: [],
        checkedTopicsIds: [],
        groups: [],
        topics: [],
        filteredGroups: [],
        filteredTopics: [],
        isModalWindowOpen: false,
        isTopicsOpen: false,
        isFiltered: false
    }

    componentDidMount() {
        this.getRecords()
        this.getTopics()
        document.addEventListener('keyup', (e) => {
            if (e.keyCode === 27) this.setState({
                isModalWindowOpen: false,
            });
        });
    }

    render() {
        return(
            <div className = 'forum-list'>
                <div key = "search-delete" className = 'search-delete'>
                    <AdminNewsSearch key="news-search" findNews = {this.findRecord} /> 
                    <Button
                        name = 'delete-record'
                        clickHandler = {this.submit}
                        disabled = {this.state.checkedGroupsIds.length || this.state.checkedTopicsIds.length ? false : true}
                        label = {<div>
                                    <img src={rubbishImg} alt='' />
                                    <span>Удалить</span>
                                </div>}
                    />
                    <Button
                        name = 'add-record'
                        clickHandler = {this.openModalWindow}
                        label = {<div>
                                    <img src={plusImg} alt='' />
                                    <span>Создать</span>
                                </div>}
                    />
                </div>
                <div key = "admin-forum-modal" className = {this.state.isModalWindowOpen ? 'overlay' : 'overlay hidden'} onClick = {this.closeModalWindow}>
                    <div className = 'modal-forum-element'>
                        <AdminForumModalWindow 
                            isOpen = {this.state.isModalWindowOpen}
                            closeModalWindow = {this.closeModalWindow}
                            groups = {this.state.filteredGroups}
                            getRecords = {this.getRecords}
                            changeState = {this.props.changeState}
                        />
                    </div>
                </div>
                <div key = "admin-forum-list" className = 'forum-current-info'>
                    <div className = 'forum-current'>Текущие группы:</div>
                    <div>
                        {this.state.filteredGroups.map(item => 
                            <AdminForumGroup 
                                title = {item.groupTitle} 
                                id = {item._id}
                                key = {item._id}  
                                deleteHandler = {() => this.deleteItem(item)} 
                                checkId = {this.checkId}
                                checkTopicsId = {this.checkTopicsId}
                                changeState = {this.props.changeState}
                                getCheckedTopicsIds = {this.getCheckedTopicsIds}
                                isTopicsOpen = {this.state.isTopicsOpen}
                                isModalWindowOpen = {this.state.isModalWindowOpen}
                                filteredTopics = {this.state.filteredTopics}
                                deleteChosenRecords = {this.deleteChosenRecords}
                                deleteTopic = {this.deleteTopic}
                                getTopics = {this.getTopics}
                                groups = {this.state.groups}
                                isFiltered = {this.state.isFiltered}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }

    getRecords = () => {
        axios({
            method: 'get',
            url: `${ server }/forumGroup`
        })
        .then((result) => {
            this.setState({  
                groups: result.data.forumGroups,          
                filteredGroups: result.data.forumGroups
            }) 
        })
        .catch((error) => {
            console.log(error);
        });
    }

    getTopics = () => {
        axios({
            method: 'get',
            url: `${ server }/forumTopic`
        })
        .then((result) => {
            this.setState({  
                topics: result.data.forumTopics,          
                filteredTopics: result.data.forumTopics,
            }) 
        })
        .catch((error) => {
            console.log(error);
        });
    }

    findRecord = (title) => {
        if(title) {
            console.log(title)
            axios({
                method: 'GET', 
                url: `${server}/forumSearch?query=${title}`
            })
            .then((result) => {
                this.setState({
                    filteredGroups: result.data.groupsList,
                    filteredTopics: result.data.topicsList,
                    isFiltered: true,
                    isTopicsOpen: true
                }) 
            })
            .catch((error) => {
                console.log(error);
            }); 
        } else {
            this.setState({
                filteredGroups: this.state.groups,
                filteredTopics: this.state.topics,
                isFiltered: false,
                isTopicsOpen: false
            }) 
        }
    }

    submit = () => {
        confirmAlert({
            title: this.state.checkedGroupsIds.length && this.state.checkedTopicsIds.length ? 
                        'Группы будут удалены вместе с темами, темы вместе с ответами' : 
                        (this.state.checkedTopicsIds.length ? 'Темы будут удалены вместе с ответами' :
                        'Группы будут удалены вместе с темами'),
            message: this.state.checkedGroupsIds.length && this.state.checkedTopicsIds.length ?
                        'Вы точно хотите удалить ' + this.state.checkedGroupsIds.length + ' групп(ы) и ' + this.state.checkedTopicsIds.length + ' тем(ы)?' :
                        (this.state.checkedTopicsIds.length ? 
                            'Вы точно хотите удалить ' + this.state.checkedTopicsIds.length + ' тем(ы)?' :
                            'Вы точно хотите удалить ' + this.state.checkedGroupsIds.length + ' групп(ы)?'),
            buttons: [
                {
                    label: 'Да',
                    onClick: (item) => this.deleteChosenRecords(item)
                },
                {
                    label: 'Нет',
                    onClick: () => {}
                }
            ]
        })
    }

    deleteChosenRecords = (records) => {
        this.state.checkedGroupsIds.length && this.state.checkedGroupsIds.length ? 
            (this.deleteTopics(),
            this.deleteGroups()
            ) :

            (this.state.checkedGroupsIds.length ?
                this.deleteGroups() :
                this.deleteTopics()
            )
    }

    deleteGroups = () => {
        axios({
            method: 'delete',
            url: `${server}/forumGroup`,
            data: {'checkedGroupsIds': this.state.checkedGroupsIds},
            config: { headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }}
        })
        .then((result) => {
            this.props.changeState()
            let newGroups = this.state.filteredGroups.filter(forumGroups => !~result.data.forumGroups.indexOf(forumGroups._id))
            this.setState({            
                filteredGroups: newGroups,
                groups: newGroups,
                checkedGroupsIds: []
            }) 
        })
        .catch(function (error) {
            console.log(error);
        })         
    } 

    deleteTopics = () => {
        axios({
            method: 'delete',
            url: `${server}/forumTopic`,
            data: {'checkedTopicsIds': this.state.checkedTopicsIds},
            config: { headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }}
        })
        .then((result) => {
            this.props.changeState()
            let newTopics = this.state.filteredTopics.filter(forumTopics => !~result.data.forumTopics.indexOf(forumTopics._id))
            this.setState({            
                filteredTopics: newTopics,
                topics: newTopics,
                checkedTopicsIds: []
            }) 
        })
        .catch(function (error) {
            console.log(error);
        })         
    } 

    openModalWindow = () => {
        this.setState({
            isModalWindowOpen: true,
            isTopicsOpen: false,
            checkedGroupsIds: [],
            checkedTopicsIds: []
        })
    }
    closeModalWindow = (e) => {
        if (e.target.className === 'overlay' || ~e.target.className.indexOf('close-window')) {
            this.setState({
                isModalWindowOpen: false,
            })
        } 
    }
    deleteItem = (item) =>{
        let id = item._id
        axios({
            method: 'delete',
            url: `${server}/forumGroup/` + id,
            data: item,
            config: { headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }}
        })
        .then((result) => {
            this.props.changeState()
            let newGroups = this.state.filteredGroups.filter(item => item._id !== result.data.forumGroup._id)
            this.setState({            
                filteredGroups: newGroups,
                groups: newGroups
            }) 
        })
        .catch((error) => {
            console.log(error);
        });
    } 

    deleteTopic = (item) =>{
        let id = item._id
        axios({
            method: 'delete',
            url: `${server}/forumTopic/` + id,
            data: item,
            config: { headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }}
        })
        .then((result) => {
            this.props.changeState()
            let newTopics = this.state.filteredTopics.filter(item => item._id !== result.data.forumTopic._id)
            this.setState({            
                filteredTopics: newTopics,
                topics: newTopics
            }) 
        })
        .catch((error) => {
            console.log(error);
        });
    } 

    checkId = (id) => {
        let tempId = this.state.checkedGroupsIds;
        if (~this.state.checkedGroupsIds.indexOf(id)) {
            tempId.splice(tempId.indexOf(id), 1)
        } else {
            tempId.push(id)
        }
        this.setState({
            checkedGroupsIds: tempId,
        })
    }

    checkTopicsId = (id) => {
        let tempId = this.state.checkedTopicsIds;
        if (~this.state.checkedTopicsIds.indexOf(id)) {
            tempId.splice(tempId.indexOf(id), 1)
        } else {
            tempId.push(id)
        }
        this.setState({checkedTopicsIds: tempId}, () => this.getCheckedTopicsIds(this.state.checkedTopicsIds))
    }

    getCheckedTopicsIds = (array) => {
        this.setState({
            checkedTopicsIds: array
        })
    }
}
export default AdminForumGroupsList;