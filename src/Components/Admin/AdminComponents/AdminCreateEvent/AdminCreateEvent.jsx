import React, {Component} from 'react';
import AdminDatePicker from '../AdminDatePicker/AdminDatePicker';
import Button from '../../../Button/Button';
import TextField from '../../../TextField/TextField';
import './AdminCreateEvent.css';
import { server } from '../../../../api';
import Editor from  "../AdminEditor/AdminEditor";

class AdminCreateEvent extends Component { 
    state = {
        title: '',
        dateStart:new Date(),
        dateEnd:new Date(),
        text : '',
        isOpen: false
    }
    componentDidMount (){
        if(this.props.event){
            this.setState({
                id:this.props.event._id,
                dateStart: this.props.event.dateStart,
                dateEnd: this.props.event.dateEnd,
                text:this.props.event.text,
                title:this.props.event.title,
                getInfo:false
            })
        }
    }
    getValue = (obj) => {
        this.setState({title:obj.value});
      }
      getStartDate = (str) =>{
          this.setState({dateStart:str})
      }
      getEndDate = (str) =>{
        this.setState({dateEnd:str})
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
            this.setState({title:'', text:'',dateStart:new Date(),dateEnd:new Date(), isOpen: !this.state.isOpen})
            this.props.saveEvent()           
    }
      cancel = () => {  
       this.setState({title:'', text:'',data:'',isOpen: !this.state.isOpen})     
       this.props.cancel();
     }
     closeInfo = () => {
        this.setState({getInfo:true})
        this.props.closeInfo(false)
    }
    updateEvent = () =>{
        this.props.closeInfo(false);
        this.sendUpdateEvent();
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
                <AdminDatePicker 
                    date = {this.state.dateStart} 
                    onSelectDate = {this.getStartDate} 
                    label = 'Дата начала '
                />
                <AdminDatePicker 
                    date = {this.state.dateEnd} 
                    onSelectDate = {this.getEndDate} 
                    label = 'Дата окончания'
                />
                </div>
                <Editor text = {this.state.text} getCurrentText = {this.getCurrentText}/>
                <div className="change-state-buttons">  
                    <Button 
                        name = "button-admin button-admin-background" 
                        label = 'Сохранить' 
                        clickHandler = {this.props.event ? this.updateEvent : this.sendEvent}
                    />
                    <Button 
                        name = "button-admin button-admin-background" 
                        label = 'Отменить' 
                        clickHandler = {this.props.event ?this.closeInfo: this.cancel}
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
export default AdminCreateEvent;