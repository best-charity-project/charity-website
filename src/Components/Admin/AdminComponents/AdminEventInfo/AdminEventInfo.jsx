import React, {Component} from 'react';
import './AdminEventInfo.css';
import AdminDateEvent from '../AdminDateEvent/AdminDateEvent';
import Button from '../../../Button/Button';
import TextField from '../../../TextField/TextField';
import MyEditor from  "../AdminEditor/AdminEditor";
class AdminEventInfo extends Component {
    closeInfo = () => {
        this.props.closeInfo(false)
    }

    
    render() {
         return (
            <div className = 'admin-event-info'>
            <Button name = 'admin-info-button' clickHandler ={this.closeInfo}/>          
            <div> 
                <p className = 'name-event'> Название события  </p>
                <TextField 
                  value = {this.props.event.name}
                  id = "title" 
                  type = 'text' 
                  nameClass = 'event-info-input'
                  name = 'Название события' 
                />
            </div>
            <div>
                <AdminDateEvent date = {this.props.event.date} />                       
             </div>
             
             <div className = 'event-info-text'>
                 <div >
                 <p>{this.props.event.text}
                 </p>
                 </div>
             </div>
            </div>    
        )
    }
}

export default AdminEventInfo;