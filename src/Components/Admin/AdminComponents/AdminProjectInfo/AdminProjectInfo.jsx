import React, {Component} from 'react';
import './AdminProjectInfo.css';
// import AdminDateEvent from '../AdminDateEvent/AdminDateEvent';
import Button from '../../../Button/Button';
import TextField from '../../../TextField/TextField';
import MyEditor from  "../AdminEditor/AdminEditor";
import { server } from "../../../../api";

class AdminProjectInfo extends Component {
    constructor (props){
        super(props);
        this.state = {
            op:'',
            id:this.props.project._id,
            date : this.props.project.date,
            text:this.props.project.text,
            name:this.props.project.name,
            getInfo:false
        }
    }
    closeInfo = () => {
        this.setState({getInfo:true})
        this.props.closeInfo(false)
    }
    getCurrentText = (str) =>{
        this.setState({text:str});
    }
    getValue = (str) => {
        this.setState({name : str})
    }
    getDate = (str) =>{
        this.setState({date:str})
    }
    updateProject = () =>{
        this.props.closeInfo(false);
        this.sendUpdateProject();
    }
    render() {
        return (
           <div className = 'admin-project-info'>
                     
           <div className = 'project-input-container'> 
               <p className = 'name-project'> Название проекта  </p>
               <TextField 
                 value = {this.state.name}
                 onChangeValue = {this.getValue}
                 id = "title" 
                 type = 'text' 
                 nameClass = 'project-info-input'
                 name = 'Название проекта' 
               />
           </div>
           <div>
               {/* <AdminDateEvent onSelectData= {this.getDate} date = {this.state.date}  />                        */}
            </div>
               <MyEditor text = {this.props.project.text} getCurrentText = {this.getCurrentText}/>
               <div className="change-state-buttons">  
                   <Button
                       name = "button-admin button-admin-background" 
                       label = 'Сохранить' 
                       clickHandler = {this.updateProject}
                   />
                   <Button
                        name = "button-admin button-admin-background"  
                        clickHandler ={this.closeInfo}
                        label='Закрыть'
                        />
               </div> 
          
           </div>    
       )
   }
   sendUpdateProject = () =>{
    const id = this.state.id
    const URL = `${ server }/projects/`+id;
    fetch(URL, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state),
    })
        .then(response => response.json())  
  } 
}
export default AdminProjectInfo;