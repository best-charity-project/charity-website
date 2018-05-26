import React, {Component} from 'react';
import AdminDateEvent from '../AdminDateEvent/AdminDateEvent';
import AdminTextEvent from '../AdminTextEvent/AdminTextEvent';
import Button from '../../../Button/Button';
import TextField from '../../../TextField/TextField';
import './AdminCreateEvent.css';
import MyEditor from  "../AdminEditor/AdminEditor";

class AdminCreateEvent extends Component {
    state = {
        name: '',
        date:'',
        text : ''
    }

    getValue = (str) => {
        const newValue = str;
        this.setState({name:str});
      }
      getDate = (str) =>{
          let milissecCount = Date.parse(str);
          let date = new Date(milissecCount);
          let day = ((date.getDate()-1)<=10)?'0'+(date.getDate()):(date.getDate());
          let month= ((date.getMonth()-1)<10)?'0'+(date.getMonth()+1):(date.getMonth()-1);
          let newDate = day+'.'+month+'.'+date.getFullYear();
          this.setState({date:newDate})
      }

      getCurrentText = (str) =>{
        this.setState({text:str});
    }

      sandEvent = () =>{
        fetch('http://localhost:3001/api/admin-panel/events', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'cors',
            body: JSON.stringify(this.state),
        })
            .then(response => response.json())
      }
   
    render() {
        return(
            <div className = 'modal-window'> 
                <div className = "date-and-input">
                <AdminDateEvent onSelectData= {this.getDate}/> 
                <div className="event-title">
                <p>Название события</p>
                <TextField 
                    id = "title" 
                    type = 'text' 
                    nameClass = 'event-title-input'
                    name = 'Название события' 
                    onChangeValue = {this.getValue}
                    />
                </div>
                </div>
                <MyEditor getCurrentText = {this.getCurrentText} />
                <div className="change-state-buttons">  
                    <Button 
                        name = "button-admin button-admin-background" 
                        label = 'Сохранить' 
                        clickHandler = {this.sandEvent}
                    />
                    <Button 
                        name = "button-admin button-admin-background" 
                        label = 'Отменить' 
                        clickHandler = {this.props.cancel} 
                    /> 
                </div> 
            </div>
        )
    }
}
export default AdminCreateEvent;