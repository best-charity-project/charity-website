import React, {Component} from 'react';
import AdminDateEvent from '../AdminDateEvent/AdminDateEvent';
import AdminTextEvent from '../AdminTextEvent/AdminTextEvent';
import Button from '../../../Button/Button';
import TextField from '../../../TextField/TextField';
import './AdminCreateEvent.css';
import MyEditor from  "../AdminEditor/AdminEditor";
import { server } from '../../../../api';


class AdminCreateEvent extends Component { 
    state = {
        name: '',
        date:new Date(),
        text : '',
        isOpen: false
    }
    getValue = (str) => {
        const newValue = str;
        this.setState({name:str});
      }
      getDate = (str) =>{
          this.setState({date:str})
      }

      getCurrentText = (str) =>{
        this.setState({text:str});
    }

      sendEvent = () =>{
        fetch(`${ server }/events`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state),
            })
            .then(response => response.json())
            this.setState({name:'', text:'',date:new Date(), isOpen: !this.state.isOpen})
            this.props.saveEvent()       
            
      }
      cancel = () => {  
       this.setState({name:'', text:'',data:''})     
       this.props.cancel();
       this.setState({isOpen: !this.state.isOpen})
     }
     UpdateStateEditor = (str) =>{
         this.setState({isOpen: !str})
     }
    render() {
        return(
            <div className = 'modal-window'> 
                <div className = "date-and-input">
                <AdminDateEvent onSelectData= {this.getDate} date = {this.state.date} /> 
                <div className="event-title">
                <p>Название события</p>
                <TextField 
                    value = {this.state.name}
                    id = "title" 
                    type = 'text' 
                    nameClass = 'event-title-input'
                    name = 'Название события' 
                    onChangeValue = {this.getValue}
                    />
                </div>
                </div>
                <MyEditor getCurrentText = {this.getCurrentText} text = {this.state.text} isOpen = {this.state.isOpen} UpdateState = {this.UpdateStateEditor}/>
                <div className="change-state-buttons">  
                    <Button 
                        name = "button-admin button-admin-background" 
                        label = 'Сохранить' 
                        clickHandler = {this.sendEvent}
                    />
                    <Button 
                        name = "button-admin button-admin-background" 
                        label = 'Отменить' 
                        clickHandler = {this.cancel} 
                    /> 
                </div> 
            </div>
        )
    }
}
export default AdminCreateEvent;