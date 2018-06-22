import React, {Component} from 'react';
import Button from '../../../Button/Button';

import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import moment from 'moment';
import './AdminProject.css';
import axios from 'axios';
import {server} from '../../../../api';

class AdminProject extends Component {
    state = {
        id: ''
    }
    componentDidMount (){
        this.setState({
            id:this.props.projects._id,
            image:this.props.projects.image,
            isPublic:this.props.projects.isPublic,
            // date:this.props.projects.date,
            name:this.props.projects.name,
            organization:this.props.projects.organization,
            head:this.props.projects.head,
            contacts:this.props.projects.contacts,
            address:this.props.projects.address,
            site:this.props.projects.site,
            video:this.props.projects.video,
            // shortText:this.props.projects.shortText,
            fullText:this.props.projects.fullText,
            sourse: this.props.projects.sourse,
            createAt:this.props.projects.createAt
        })
    }
   render() {
       return (
           <div className="projects-admin"  id = {this.state.id} >
               <div onClick = {this.props.showProjects} className="projects-admin-title">{this.state.name}</div>
               {/* <div>{moment(this.state.date).format('DD-MM-YYYY')}</div> */}
               <div>{this.state.isPublic ? 'Да' : 'Нет'}</div>
               <div>
                   <Button
                       name = "button-admin admin-cancel"
                       label = {<span aria-hidden="true">&times;</span>}
                       clickHandler = {this.submit}
                   />
               </div>
               <div>                
                    <Button
                        name = {this.state.isPublic? 'button-publish-projects':'button-not-publish-projects'}
                        label = {this.state.isPublic? 'Отменить публикацию':'Опубликовать'}
                        clickHandler = {this.publishProjects}
                    />
                </div>
           </div>
       )
   }
   submit = () =>{
       confirmAlert({
           title:'Подтвердите удаление проекта',
           message: 'Вы точно хотите удалить проект?',
           buttons:[
               {
                   label: 'Да',
                   onClick: (item)=>this.props.deleteHandler(item)
               },
               {
                   label: 'Нет',
                   onClick: ()=>{}
               }
           ]
       })
   }
   publishProjects = (e) => {
    this.setState({isPublic: !this.state.isPublic}, () =>{
        let formData  = new FormData();
        Object.keys(this.state).forEach(key => formData.append(key, this.state[key]));
        axios({
            method: 'put',
            url: `${server}/projects/${this.state.id}`,
            data: formData,
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data; charset=UTF-8'
                }},
        })
          .catch(function (error) {
            console.log(error);
          });
    })
   }
}

export default AdminProject;