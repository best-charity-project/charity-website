import React, {Component} from 'react';
import AdminDateEvent from '../AdminDateEvent/AdminDateEvent';
import AdminTextEvent from '../AdminTextEvent/AdminTextEvent';
import Button from '../../../Button/Button';
import TextField from '../../../TextField/TextField';
import './AdminCreateEvent.css';

class AdminCreateEvent extends Component {
    state = {
        name: '',
        date:''
    }

    getValue = (str) => {
        const newValue = str;
        console.log(str)
        this.setState({name:str})
        // this.setState({value:newValue});
      }
      getData = (str) =>{
          let milissecCount = Date.parse(str);
          let date = new Date(milissecCount);
          let day = ((date.getDate()-1)<=10)?'0'+(date.getDate()):(date.getDate());
          let month= ((date.getMonth()-1)<10)?'0'+(date.getMonth()+1):(date.getMonth()-1);
          console.log(date.getMonth())
          let newDate = day+'.'+month+'.'+date.getFullYear();
          console.log(newDate)
        this.setState({date:newDate})
      }

      saveEvent = () =>{
        alert('rfrf');
        console.log(this.state);
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
            .then(data => console.log(data));
      }
    render() {
        

        return(
            <div>
                <AdminDateEvent onSelectData= {this.getData}/> 
                <div className="event-title">
                <TextField 
                    id = "title" 
                    type = 'text' 
                    nameClass = 'event-title-input'
                    name = 'Название события' 
                    onChangeValue = {this.getValue}
                    />
                </div>
                <AdminTextEvent/>  
                <div className="change-state-buttons">  
                    <Button 

                        name = "button-admin button-admin-background" 
                        label = 'Сохранить' 
                        clickHandler = {this.saveEvent} 
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