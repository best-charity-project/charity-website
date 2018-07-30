import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';
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
        console.log('AdminForumGroupList mount')
        this.getRecords()
        this.getTopics()
        document.addEventListener('keyup', (e) => {
            if (e.keyCode === 27) this.setState({
                isModalWindowOpen: false,
            });
        });
    }

    render() {
        console.log("render group list", this.state.filteredTopics)
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
        console.log('findRecord')
        if(!title) {
            console.log('axios')
            axios({
                method: 'GET', 
                url: `${server}/forumSearch`
            })
            .then((result) => {
                this.setState({
                    filteredGroups: result.data.groupsList,
                    filteredTopics: result.data.topicsList,
                }) 
            })
            .catch((error) => {
                console.log(error);
            });
        } else {
            console.log('filter')
            const {groups, topics} = this.state
            let topicsArr = topics.filter((item) => {
                return item.topicTitle.toLowerCase().includes(title)
            })
            console.log(topicsArr)
            topics.filter((item) => {
                item.topicTitle.toLowerCase().includes(title) ? 
                    this.setState({
                        filteredTopics: topicsArr,
                        isFiltered: true,
                        isTopicsOpen: true
                        //  topics.filter((item) => {
                        //     console.log('topic', item)
                        //     return item.topicTitle.toLowerCase().includes(title) 
                        

                        
                        
                    }, 
                    
                    () => this.setState({
                        filteredGroups: groups.filter(item => {
                            
                            return item._id.match(topicsArr.map((el) => {
                               
                            return el.group_id._id
                        }))}), 
                        isFiltered: true,
                        isTopicsOpen: true  
                    }, () =>  console.log('state', this.state))
                )
                 : null})
                }}

                        // groups.filter((item, this.state.filteredTopics.filter((el) => {
                        //    return el.group_id._id}) => {
                        //     return item._id
                        
                        // _.filter(groups._id, _.filter(this.state.filteredTopics, function(el) {
                        //     return el.group_id._id
                        // }))
                        
                        
                        
                        // groups.filter((item) => {
                        //     console.log(item._id)
                        //     return item._id.includes(this.state.filteredTopics.filter((el) => {
                        //     return this.state.filteredTopics.filter((el) => {
                        //         console.log(el.group_id._id)
                        //         return el.group_id._id
                        //     }))
                        //     console.log('group', item)
                        //     return item._id.includes(this.state.filteredTopics.filter((item) => {
                                
                        //         return item.group_id._id
                        //     }))
                        // }),
            //         })
                    
            //     ) 
            //         : 
            //  null
            // }) 
            // groups.filter((item) => {
                // item.groupTitle.toLowerCase().includes(title) ? 
                    // this.setState({
                    //     filteredGroups: groups.filter((item) => {
                    //         return item.groupTitle.toLowerCase().includes(title)
                    //     }),
                    //     isFiltered: true
                    // }) 
                //     : 
                // null
            // }) 
            // this.setState({
            //     filteredTopics: topics.filter((item) => {
            //         return item.topicTitle.toLowerCase().includes(title)
            //     }),
            //     isTopicsOpen: true
            // }) 
                /* this.setState({
                    filteredGroups: groups.filter((item) => {
                        return item.groupTitle.toLowerCase().includes(title)
                    }),
                    filteredTopics: topics.filter((item) => {
                        return item.topicTitle.toLowerCase().includes(title)
                    }),
                    isTopicsOpen: true
                })  */
                
        
    

    // findGroup = (title) => {
    //     if(!title) {
    //         fetch(`${server}/forumGroup`, {
    //             method: 'GET', 
    //             mode: 'cors'
    //             })
    //             .then(response => {
    //                 if (response.ok) {
    //                     return response.json()
    //                 } else {
    //                     throw new Error('Something went wrong ...')
    //                 }
    //             })
    //             .then(data => this.setState({filteredGroups: data.forumGroups}))
    //             .catch(error => this.setState({error}))
    //     } else {
    //         const {groups} = this.state
    //         this.setState({
    //             filteredGroups: groups.filter((item) => {
    //                 return item.groupTitle.toLowerCase().includes(title)
    //             })
    //         })
    //     }
    // }

    // findTopic = (title) => {
    //     if(!title) {
    //         fetch(`${server}/forumTopic`, {
    //             method: 'GET', 
    //             mode: 'cors'
    //             })
    //             .then(response => {
    //                 if (response.ok) {
    //                     return response.json()
    //                 } else {
    //                     throw new Error('Something went wrong ...')
    //                 }
    //             })
    //             .then(data => this.setState({filteredTopics: data.forumTopics}))
    //             .catch(error => this.setState({error}))
    //     } else {
    //         const {topics} = this.state
    //         this.setState({
    //             filteredTopics: topics.filter((item) => {
    //                 return item.topicTitle.toLowerCase().includes(title)
    //             }),
    //             // isTopicsOpen: true
    //         })
    //     }
    // }

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