import React, {Component} from 'react';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';

import {server} from '../../../../../api';
import Button from '../../../../Button/Button';
import Checkbox from '../../../../Checkbox/Checkbox';
import './AdminForumUser.css';

class AdminForumUser extends Component {
    state = {
        id: '',
        title: ''
    }
    componentDidMount (){
        this.setState({
            id: this.props.id,
            title: this.props.title
        })
    }
    render() {
       return (
           <div className="admin-forum-user" id = {this.state.id}>
                <div className = "admin-forum-user-checkbox">
                    <Checkbox 
                        name = "checkbox-id" 
                        onChange = {this.checkId}
                    />
                    <div onClick = {this.showUser} className = "admin-forum-user-title">{this.state.title}</div>
                </div>
                <div>
                    <Button
                       name = "button-admin"
                       label = 'Изменить'
                       clickHandler = {this.changeUser}
                    />
                </div> 
                <div>
                    <Button
                       name = "button-admin admin-cancel"
                       label = {<span aria-hidden="true">&times;</span>}
                       clickHandler = {this.submit}
                    />
                </div>      
           </div>
        )
    }
    checkId = () => {
        this.props.checkId(this.state.id)
    }
    showUser = () => {
        this.props.getInfoUser(this.state.id)
    }
    changeUser = () => {
        axios({
            method: 'put',
            url: `${server}/forumUser/`+this.state.id,
            data: this.state,
            config: { headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }}
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    submit = () => {
        confirmAlert({
          title: 'Подтвердите удаление пользователя',
          message: 'Вы точно хотите удалить пользователя?',
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

export default AdminForumUser;