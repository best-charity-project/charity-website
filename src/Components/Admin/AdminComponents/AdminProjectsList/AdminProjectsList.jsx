import React, {Component} from 'react';
import AdminProject from '../AdminProject/AdminProject';
import './AdminProjectsList.css'
// import ProjectInfo from '../AdminProjectInfo/AdminProjectInfo';
import { server } from '../../../../api';
import {withRouter} from "react-router-dom";

class AdminProjectsList extends Component {
    state = {
        projectInfo:'',
        showProjects:false
    };
    // componentWillReceiveProps(nexprops, nextstate){
    //     if(nexprops.length != this.state.projects.length){
    //         this.setState({projects:nexprops.projects})
    //     }
    // }
    render() {
        return (
            <div className="projects-list-admin">
                <div className="projects-list-header">
                    <div>Название проекта</div>
                    <div>Дата проведения</div>
                    <div>Опубликовано</div>
                    <div>Удалить проект</div>
                    <div>Статус</div>
                </div>            
                
                <div>                    
                    {this.props.projects.map(item => 
                        <AdminProject 
                            // clickHandler = {this.getProjectInfo }
                            showProjects = {this.getProjectInfo}
                            projects = {item} 
                            key = {item._id} 
                            deleteHandler = {() => this.props.deleteProject(item)} 
                        />                        
                    )}
                   {/* {(this.state.projectInfo)? (<div className={this.state.getProjectInfo ? 'project-info-container' : 'without-info'}>
                        <ProjectInfo project = {this.state.projectInfo} closeInfo = {this.closeInfo}/>
                    </div>): null} */}
                </div>  
            </div>  
        )
    }
   
      getProjectInfo = (e) => {
        // this.setState({getProjectInfo: !this.state.getProjectInfo});
        let id = e.target.parentNode.id;
        const URL = `${ server }/projects/${id}`;
        fetch(URL)
        .then(response => response.json())
        .then(data => {
            this.setState({ projectInfo: data.projects });
            this.props.history.push({
                pathname: '/admin-panel/projects/create',
                state: { detail: this.state.projectInfo}
            })
        })
        // .catch(error => this.setState({ error, isLoading: false }));
        
    }
    // closeInfo = (str) => {
    //     this.setState({getProjectInfo : false, projectInfo:null});
    //     this.props.getUpdateProjectsList();
    // }
}
export default withRouter(AdminProjectsList);