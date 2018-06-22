import React, {Component} from 'react';
import AdminDatePicker from '../AdminDatePicker/AdminDatePicker';
import AdminTimePicker from '../AdminTimePicker/AdminTimePicker';
import Button from '../../../Button/Button';
import TextField from '../../../TextField/TextField';
import './AdminCreateEvent.css';
import { server } from '../../../../api';
import Editor from  "../AdminEditor/AdminEditor";

class AdminCreateEvent extends Component { 
    state = {
        title: '',
        date:new Date(),
        text : '',
        timeStart: '',
        timeEnd: '',
        isOpen: false
    }
    getValue = (obj) => {
        this.setState({title:obj.value});
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
            this.setState({title:'', text:'',date:new Date(), isOpen: !this.state.isOpen})
            this.props.saveEvent()           
    }
      cancel = () => {  
       this.setState({title:'', text:'',data:'',isOpen: !this.state.isOpen})     
       this.props.cancel();
     }
    render() {
        return(
            <div className = 'modal-window'> 
                <div className = "date-and-input">
                <div className="event-title">
                <TextField 
                    label = 'Название события'
                    value = {this.state.title}
                    id = "title" 
                    type = 'text' 
                    nameClass = 'event-title-input'
                    name = 'Название события' 
                    onChangeValue = {this.getValue}
                    />
                </div>
                <AdminDatePicker date = {this.state.date} onSelectData= {this.getDate} />
                <AdminTimePicker label = 'Время начала события'/>
                <AdminTimePicker label = 'Время окончания события'/>
                </div>
                <Editor text = {this.state.text} getCurrentText = {this.getCurrentText}/>
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