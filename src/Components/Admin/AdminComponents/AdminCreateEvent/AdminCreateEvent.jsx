import React, {Component} from 'react';
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import axios from 'axios';

import AdminDatePicker from '../AdminDatePicker/AdminDatePicker';
import Button from '../../../Button/Button';
import TextField from '../../../TextField/TextField';
import './AdminCreateEvent.css';
import { server } from '../../../../api';
import Editor from  "../AdminEditor/AdminEditor";

class AdminCreateEvent extends Component { 
    state = {
        title: '',
        dateStart: new Date(),
        dateEnd: new Date(),
        textEditorState: EditorState.createEmpty(),
        isOpen: false,
        id: ''
    }
    componentWillMount (){
        if(this.props.event){
            let textEditorState = EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.event.text)));
            this.setState({
                id:this.props.event._id,
                dateStart: this.props.event.dateStart,
                dateEnd: this.props.event.dateEnd,
                textEditorState: textEditorState,
                title:this.props.event.title,
                getInfo:false,
            })
        }
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
                <Editor 
                    initialEditorState = {this.state.textEditorState} 
                    onEditorStateChange = {this.onEditorStateChange}
                />
                <div className="change-state-buttons">  
                    <Button 
                        name = "button-admin button-admin-background" 
                        label = 'Сохранить' 
                        clickHandler = {this.props.event ? this.updateEvent : this.sendEvent}
                    />
                    <Button 
                        name = "button-admin button-admin-background" 
                        label = 'Отменить' 
                        clickHandler = {this.props.event ? this.closeInfo : this.cancel}
                    /> 
                </div> 
            </div>
        )
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
    onEditorStateChange = (editorState) => {
        this.setState({textEditorState: editorState});
    }

    sendEvent = () =>{
        const sendedBody = this.state;
        sendedBody.text = JSON.stringify(convertToRaw(this.state.textEditorState.getCurrentContent()));
        fetch(`${ server }/events`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendedBody)
        })
        .then(response => {
            this.setState({
                title: '', 
                textEditorState: EditorState.createEmpty(),
                dateStart: new Date(),
                dateEnd: new Date(), 
                isOpen: !this.state.isOpen
            })
            this.props.saveEvent()   
        })
        .catch(function (error) {
            console.log(error);
        });         
    }
    sendUpdateEvent = () => {
        const id = this.state.id
        const URL = `${ server }/events/`+id;
        const sendedBody = this.state;
        sendedBody.text = JSON.stringify(convertToRaw(this.state.textEditorState.getCurrentContent()));
        fetch(URL, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendedBody)
        })
        .then(response => {
            this.setState({
                title: '', 
                textEditorState: EditorState.createEmpty(),
                dateStart: new Date(),
                dateEnd: new Date(), 
                isOpen: !this.state.isOpen
            })
            this.props.saveEvent()   
        })
        .catch(function (error) {
            console.log(error);
        });   
    }
    cancel = () => {  
        this.setState({
           title:'', 
           textEditorState: EditorState.createEmpty(),
           data:'',
           isOpen: !this.state.isOpen
        })     
        this.props.cancel();
    }
     closeInfo = () => {
        this.setState({getInfo:true})
        this.props.closeInfo(false)
    }
    updateEvent = () => {
        this.props.closeInfo(false);
        this.sendUpdateEvent();
    }
}
export default AdminCreateEvent;