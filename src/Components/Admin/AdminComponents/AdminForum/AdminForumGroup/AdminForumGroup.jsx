import React, {Component} from 'react';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';

import {server} from '../../../../../api';
import Button from '../../../../Button/Button';
import Checkbox from '../../../../Checkbox/Checkbox';
import './AdminForumGroup.css';
import AdminForumTopicsList from '../AdminForumTopicsList/AdminForumTopicsList';

class AdminForumGroup extends Component {
    state = {
        id: '',
        groupTitle: '',
        newTitle: '',
        isChanging: false,
        isTopicsOpen: false,
    }
    componentDidMount (){
        this.setState({
            id: this.props.id,
            groupTitle: this.props.title,
            newTitle: this.props.title,
            isTopicsOpen: this.props.isTopicsOpen
        })
    }

    componentWillReceiveProps(nextProps) {
        nextProps.isModalWindowOpen || nextProps.isFiltered ? 
            this.setState({
                isTopicsOpen: nextProps.isTopicsOpen
            }) :
            this.setState({
                isTopicsOpen: false
            })
    }

    render() {
        return (
           <div>
                <div className = 'admin-forum-record' id = {this.state.id}>
                    <div className = 'admin-forum-record-checkbox'>
                        <Checkbox 
                            name = 'checkbox-id' 
                            onChange = {this.checkId}
                        />
                        <input 
                            type = 'text' 
                            className = {this.state.isChanging ? 'admin-forum-record-title active' : 'admin-forum-record-title'} 
                            name = 'admin-forum-record-title'
                            readOnly = {!this.state.isChanging ? 'true' : null}
                            value = {this.state.newTitle}
                            ref={(input) => {this.nameInput = input}} 
                            onChange = {this.onChange}
                            onClick = {!this.state.isChanging ? this.showTopics : null}
                        />
                    </div>
                    <div className = 'admin-forum-buttons'>
                        {!this.state.isChanging ? 
                            <Button
                                name = 'button-admin'
                                label = 'Изменить'
                                clickHandler = {this.changeRecord}
                            /> :
                            <div className = 'admin-forum-change-buttons'>
                                <Button
                                    name = 'button-admin'
                                    label = 'Сохранить'
                                    clickHandler = {this.saveRecord}
                                />
                                <Button
                                    name = 'button-admin'
                                    label = 'Отмена'
                                    clickHandler = {this.cancelRecord}
                                />
                            </div>
                        }
                    </div> 
                    <div className = 'admin-forum-delete-button'>
                        <Button
                            name = 'button-admin admin-cancel'
                            label = {<span aria-hidden="true">&times;</span>}
                            clickHandler = {this.submit}
                        />
                    </div> 
                </div>
                {this.state.isTopicsOpen ? 
                    <div className = 'admin-forum-topics-list'>
                        <AdminForumTopicsList 
                            changeState = {this.props.changeState}
                            id = {this.state.id}
                            getCheckedTopicsIds = {this.props.getCheckedTopicsIds}
                            filteredTopics = {this.props.filteredTopics}
                            deleteChosenRecords = {this.props.deleteChosenRecords}
                            deleteTopic = {this.props.deleteTopic}
                            getTopics = {this.props.getTopics}
                            checkId = {this.props.checkTopicsId}
                            groups = {this.props.groups}
                        /> 
                    </div> :
                    null
                }     
           </div>
        )
    }
    checkId = () => {
        this.props.checkId(this.state.id)
    }
    onChange = (event) => {
        this.setState({
            newTitle: event.target.value
        })
    }
    showTopics = () => {
        this.setState({
            isTopicsOpen: !this.state.isTopicsOpen
        })
    }
    changeRecord = () => {
        this.setState({
            isChanging: true
        })
        this.focus()
    }

    focus = () => {
        this.nameInput.focus();
    }

    saveRecord = () => {
        this.setState({
            groupTitle: this.state.newTitle
        }, () => {
            axios({
                method: 'put',
                url: `${server}/forumGroup/` + this.state.id,
                data: this.state,
                config: { headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }}
            })
            .then(response => {
                this.setState({
                    isChanging: false,
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        })
    }

    cancelRecord = () => {
        this.setState({
            isChanging: false,
            newTitle: this.state.groupTitle
        })
        this.focus()
    }

    submit = () => {
        confirmAlert({
          title: 'Группа будет удалена вместе с темами',
          message: 'Вы точно хотите удалить группу?',
          buttons: [
            {
              label: 'Да',
              onClick: (item) => this.props.deleteHandler(item)
            },
            {
              label: 'Нет',
              onClick: () => {}
            }
          ]
        })
    }
}

export default AdminForumGroup;