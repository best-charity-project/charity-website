import React, {Component} from 'react';
import './AdminEventInfo.css';
import AdminDateEvent from '../AdminDateEvent/AdminDateEvent';
import Button from '../../../Button/Button';
import TextField from '../../../TextField/TextField';
import MyEditor from  "../AdminEditor/AdminEditorInfo";
import { server } from "../../../../api";

class AdminEventInfo extends Component {

    constructor (props){
        super(props);
        this.state = {
            op:'',
            id:this.props.event._id,
            date : this.props.event.date,
            text:this.props.event.text,
            name:this.props.event.name,
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
    this.setState({name : str.value})
}
getDate = (str) =>{
    this.setState({date:str})
}
updateEvent = () =>{
    this.props.closeInfo(false);
    this.sendUpdateEvent();
}
    render() {
         return (
            <div className = 'admin-event-info'>
            <div className = 'event-input-container'> 
                <p className = 'name-event'> Название события  </p>
                <TextField 
                  value = {this.state.name}
                  onChangeValue = {this.getValue}
                  id = "title" 
                  type = 'text' 
                  nameClass = 'event-info-input'
                  name = 'Название события' 
                />
            </div>
            <div>
                <AdminDateEvent onSelectData= {this.getDate} date = {this.state.date}  />                       
             </div>
                <MyEditor text = {this.props.event.text} getCurrentText = {this.getCurrentText}/>
                <div className="change-state-buttons">  
                    <Button 
                        name = "button-admin button-admin-background" 
                        label = 'Сохранить' 
                        clickHandler = {this.updateEvent}
                    />
                     <Button 
                        name = "button-admin button-admin-background" 
                        label = 'Закрыть' 
                        clickHandler = {this.closeInfo} 
                    /> 
                </div> 
           
            </div>    
        )
    }  
    
    sendUpdateEvent = () =>{
        const id = this.state.id
        const URL = `${ server }/events/`+id;
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

export default AdminEventInfo;