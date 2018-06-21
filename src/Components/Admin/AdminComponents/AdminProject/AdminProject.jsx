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
            isPublic:this.props.projects.isPublic,
            date:this.props.projects.date,
            name:this.props.projects.name,
            shortText:this.props.projects.shortText,
            fullText:this.props.projects.fullText,
            image:this.props.projects.image,
            createAt:this.props.projects.createAt
        })
    }
   render() {
       return (
           <div className="projects-admin"  id = {this.state.id} >
               <div onClick = {this.props.showProjects} className="projects-admin-title">{this.state.name}</div>
               <div>{moment(this.state.date).format('DD-MM-YYYY')}</div>
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
                        label = {this.state.isPublic? 'Опубликовано':'Опубликовать'}
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
    
    // if(this.props.projects.isPublic){
        // e.preventDefault();
    //     this.setState({isPublic:false}, this.sendPublishProjects)
    //     console.log(this.props.projects.isPublic)
    // }else{
    //     this.setState({isPublic:true}, this.sendPublishProjects);
    //     console.log(this.props.projects.isPublic)
    // }
   }
}

export default AdminProject;