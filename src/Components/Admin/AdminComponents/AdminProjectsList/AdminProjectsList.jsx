import React, {Component} from 'react';
import AdminProject from '../AdminProject/AdminProject';
import './AdminProjectsList.css'
import { server } from '../../../../api';
import {withRouter} from "react-router-dom";

class AdminProjectsList extends Component {
    state = {
        projectInfo:'',
        showProjects:false
    }
    render() {
        return (
            <div className="projects-list-admin">
                <div className="projects-list-header">
                    <div>Название проекта</div>
                    <div>Опубликовано</div>
                    <div>Удалить проект</div>
                    <div>Статус</div>
                </div>      
                <div>                    
                    {this.props.projects.map(item => 
                        <AdminProject
                            showProjects = {this.getProjectInfo}
                            projects = {item} 
                            key = {item._id} 
                            deleteHandler = {() => this.props.deleteProject(item)}
                            checkId = {this.props.checkId}
                        />                        
                    )}
                </div>  
            </div>  
        )
    }
   
      getProjectInfo = (id) => {
        const URL = `${ server }/api/projects/${id}`;
        fetch(URL)
        .then(response => response.json())
        .then(data => {
            this.setState({ projectInfo: data });
            this.props.history.push({
                pathname: '/admin-panel/projects/create',
                state: { detail: this.state.projectInfo}
            })
        })
    }
}
export default withRouter(AdminProjectsList);