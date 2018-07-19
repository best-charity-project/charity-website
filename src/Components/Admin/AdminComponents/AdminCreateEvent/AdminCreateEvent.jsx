import React, {Component} from 'react';
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import axios from 'axios';
import _ from 'lodash';

import AdminDatePicker from '../AdminDatePicker/AdminDatePicker';
import Navigation from '../../../Navigation/Navigation';
import NavBar from '../../../NavBar/NavBar';
import Button from '../../../Button/Button';
import TextField from '../../../TextField/TextField';
import './AdminCreateEvent.css';
import {server} from '../../../../api';
import Editor from  "../AdminEditor/AdminEditor";
import AdminSelectSearch from '../AdminSelectSearch/AdminSelectSearch';

class AdminCreateEvent extends Component { 
    state = {
        title: '',
        place:'',
        dateStart:new Date(),
        timeEnd:'',
        participation: '',
        linkParticipation:'',
        organizers:'',
        speaker: '',
        speakersArray : [],
        contactPerson:'',
        contactPhone:'',
        organization:'',
        website :'',
        textEditorState: EditorState.createEmpty(),
        filter:'',
        getInputTimeEnd : false,
        deletedImages: []  
    }
    componentWillMount (){
        this.getFiltersList();
        if(this.props.location.state){
            let {title,
                place,
                dateStart,
                timeEnd,
                participation,
                linkParticipation,
                organizers,
                speaker,
                speakersArray,
                contactPerson,
                contactPhone,
                organization,
                website,
                filter,
                text,
                _id
               } = this.props.location.state.detail;
               let textEditorState = EditorState.createWithContent(convertFromRaw(JSON.parse(text)));
               this.setState({
                   id: _id,
                   dateStart: dateStart,
                   timeEnd: timeEnd,
                   textEditorState : textEditorState,
                   title: title,
                   getInfo: false,
                   contactPerson: contactPerson,
                   contactPhone: contactPhone,
                   linkParticipation: linkParticipation,
                   organization: organization,
                   place: place,
                   speakersArray: speakersArray,
                   website : website,
                   participation: participation,
                   organizers: organizers,
                   filter: filter
               })
        }
    }
    
    render() {

        return(
            <div className="admin-content"> 
                <Navigation onLogout={this.onLogout}/>
                <NavBar />
                <div className = 'admin-create-event'>
                    <div className = 'admin-event-title'>
                        <TextField 
                            label = 'Название события'
                            value = {this.state.title}
                            id = "title" 
                            type = 'text' 
                            name = 'title' 
                            onChangeValue = {this.getValue}
                        />
                    </div>
                    <div className = 'admin-event-place'>
                        <TextField 
                            label = 'Место проведения'
                            value = {this.state.place}
                            type = 'text' 
                            name = 'place' 
                            onChangeValue = {this.getPlace}
                        />
                    </div>
                    <div className = 'date-start-event'>
                        <AdminDatePicker 
                            date = {this.state.dateStart} 
                            onSelectDate = {this.getStartDate} 
                            label = 'Дата начала '
                            dateFormat = {true}
                        />
                        <div>
                            {this.state.getInputTimeEnd || this.state.timeEnd ? 
                                <AdminDatePicker 
                                    date = {!this.state.timeEnd ? this.state.dateStart:this.state.timeEnd } 
                                    onSelectDate = {this.getEndDate} 
                                    dateFormat = {false}
                                /> : 
                                <Button 
                                    name = "button-admin button-admin-background" 
                                    label = 'Время окончания' 
                                    clickHandler = {this.getInputTimeEnd}
                                />
                            }
                        </div>
                    </div>                                  
                    <div className = 'admin-event-tickets'>
                        <TextField 
                            label = 'Билеты'
                            value = {this.state.participation}
                            type = 'text' 
                            name = 'tickets' 
                            onChangeValue = {this.getParticipation}
                        />
                    </div>
                    <div className = 'event-link-participation'>
                        <TextField 
                            label = 'Ссылка на регистрацию/покупку билетов'
                            value = {this.state.linkParticipation}
                            type = 'url' 
                            name = 'linkTickets' 
                            onChangeValue = {this.getLinkParticipation}
                        />
                    </div>
                    <div className = 'admin-event-organizers'>
                        <p> Введите организаторов </p>
                        <textarea                             
                            value= {this.state.organizers}
                            onChange = {this.getOrganizers}
                            placeholder = 'Введите организаторов'
                        />
                    </div>
                    <div>
                        <div className = 'speakers-button-event'>
                            <TextField 
                                label = 'Докладчики : '
                                value = {this.state.speaker}
                                type = 'text' 
                                name = 'speakers' 
                                onChangeValue = {this.getSpeaker}
                            />
                            <Button 
                                name = "button-admin button-admin-background" 
                                label = 'Добавить' 
                                clickHandler = {this.addSpeakers}
                            />
                        </div>
                        <div className = 'speakers-list-event'> 
                            <ul>
                                {this.state.speakersArray ?
                                    this.state.speakersArray.map((el,index) => {
                                        <li key = {index}>
                                            <span> {el} </span>
                                            <Button 
                                                name = "event-delete-button" 
                                                label = '&#215;' 
                                                clickHandler = {(e)=> this.deleteSpeaker(e,index)}
                                            />
                                        </li>
                                    })
                                    :null
                                }
                            </ul>
                        </div>
                    </div>
                    <div className = 'admin-event-contact-person'>
                        <TextField 
                            label = 'Введите контактное лицо: '
                            value = {this.state.contactPerson}
                            type = 'text' 
                            name = 'contactPerson' 
                            onChangeValue = {this.getContactPerson}
                        />
                    </div>
                    <div className = 'admin-event-contact-phone'>
                        <TextField 
                            label = 'Введите контактный телефон: '
                            value = {this.state.contactPhone}
                            type = 'text' 
                            name = 'contactPhone' 
                            onChangeValue = {this.getContactPhone}
                        /> 
                    </div>
                    <div className = 'admin-event-organization'>
                        <TextField 
                            label = 'Введите организацию : '
                            value = {this.state.organization}
                            type = 'text' 
                            name = 'organization' 
                            onChangeValue = {this.getOrganization}
                        />
                    </div>
                    <div className = 'admin-event-website'>
                        <TextField 
                            label = 'Введите адресс сайта : '
                            value = {this.state.website}
                            type = 'url' 
                            name = 'website' 
                            onChangeValue = {this.getWebsite}
                        />
                    </div>
                    <Editor 
                        initialEditorState = {this.state.textEditorState} 
                        onEditorStateChange = {this.onEditorStateChange}
                        getDeletedImages = {this.getDeletedImages}
                    />
                    <div className = 'select-wrapper-event'>
                        {this.state.filters ? 
                            <AdminSelectSearch 
                                value = {this.state.filter}
                                filtersList = {this.state.filters}
                                getFilter = {this.getFilter}
                            /> 
                            :null
                        }                              
                    </div>
                    <div className="change-state-buttons">  
                        <Button 
                            name = "button-admin button-admin-background" 
                            label = {this.props.location.state ? 'Обновить': 'Сохранить'} 
                            clickHandler = {this.sendEvent}
                        />
                        <Button 
                            name = "button-admin button-admin-background" 
                            label = 'Отменить' 
                            clickHandler = {this.onCancel}
                        /> 
                    </div>  
                </div>
            </div>
        )
    }
    getValue = (obj) => {
        this.setState({title: obj.value});
    }
    getStartDate = (str) =>{
        this.setState({dateStart: str})
    }
    getEndDate = (str) =>{
        this.setState({timeEnd: str})
    }
    onEditorStateChange = (editorState) => {
        this.setState({textEditorState: editorState});
    }
    getDeletedImages =  (deletedImages) => {
        this.setState({deletedImages: deletedImages})
    }
    getFilter = (str) => {
        this.setState({filter: str});
    }
    sendEvent= () => {
        let id = ''
        if (this.props.location.state) {
            id = this.props.location.state.detail._id;
        }
        const sendedBody = this.state;
        sendedBody.text = JSON.stringify(convertToRaw(this.state.textEditorState.getCurrentContent()));
        axios({
            method: id ? 'put' : 'post',
            url: id ? `${server}/events/` + id : `${server}/events/`,
            data: sendedBody,
            config: { headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }},
        })
        .then(response => {
            this.props.history.push({
                pathname: '/admin-panel/events'
            })  
        })
        .catch(function (error) {
            console.log(error);
        });       
    }
    onCancel = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/admin-panel/events'
        });
    };
    getPlace = (str) => {
        this.setState({place:str.value});
    };
    getParticipation = (str) => {
        this.setState({participation:str.value});
    };
    getLinkParticipation = (str) => {
        this.setState({linkParticipation:str.value});
    };
    getOrganizers = (e) => {
        this.setState({organizers:e.target.value});
    };
    getSpeaker = (str) => {
        this.setState({speaker: str.value})
    };
    addSpeakers = () => {
        let {speakersArray, speaker} = this.state;
        speakersArray.push(speaker);
        this.setState({speakersArray:speakersArray, speaker:''});        
    }
    deleteSpeaker = (e,index) => {
       let {speakersArray} = this.state;
       speakersArray.splice(index, 1);
       this.setState({speakersArray:speakersArray});
    }
    getOrganization = (str) => {
        this.setState({organization: str.value});
     };
    getContactPerson = (str) => {
        this.setState({contactPerson: str.value});
    };
    getContactPhone =(str) => {
        this.setState({contactPhone : str.value});
    };
    getWebsite = (str) => {
        this.setState({website : str.value});
    }
    getFiltersList = () => {  
        axios({
            method: 'get',
            url: `${ server }/filters`,
        })
        .then(res =>{
            let filterList = res.data.filterList;
            let filtersEvents = _.filter(filterList , function(el){
                if(el.type === 'events'){
                    return el
                }
            });
            this.setState({
                filters:filtersEvents,
            })
        })
     
      }
    getInputTimeEnd = () => {
        this.setState({getInputTimeEnd : true});
    } 
}
export default AdminCreateEvent;