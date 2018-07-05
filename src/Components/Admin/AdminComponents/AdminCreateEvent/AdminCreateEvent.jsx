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
        isOpen: false,
        speaker: '',
        speakersArray : []
    }
    componentDidMount (){
        if(this.props.event){
            this.setState({
                id:this.props.event._id,
                dateStart: this.props.event.dateStart,
                dateEnd: this.props.event.dateEnd,
                text:this.props.event.text,
                title:this.props.event.title,
                getInfo:false,
                contactPerson: this.props.event.contactPerson,
                contactPhone:this.props.event.contactPhone,
                linkParticipation: this.props.event.linkParticipation,
                organization:this.props.event.organization,
                place:this.props.event.place,
                speakersArray: this.props.event.speakersArray,
                website : this.props.event.website,
                participation: this.props.event.participation,
                organizers: this.props.event.organizers
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
            this.setState({
                title:'', text:'',
                dateStart:new Date(),
                dateEnd:new Date(), 
                isOpen: !this.state.isOpen,
                contactPerson:'',
                contactPhone:'',
                linkParticipation:'',
                organization:'',
                place:'',
                speakersArray:'',
                website :'',
                participation:''
            })
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
    getPlace = (str) => {
        this.setState({place:str.value});
    }
    getParticipation = (str) => {
        this.setState({participation:str.value});
    }
    getLinkParticipation  = (str) => {
        this.setState({linkParticipation:str.value});
    }
    getOrganizers = (e) => {
        this.setState({organizers:e.target.value});
        console.log(e.target.value)
    }
    getSpeaker =(str) => {
        this.setState({speaker: str.value})
    }
    addSpeakers = () => {
        let {speakersArray, speaker} = this.state;
        speakersArray.push(speaker)
        this.setState({speakersArray:speakersArray, speaker:''})        
    }
    deleteSpeaker = (e,index) => {
      let {speakersArray} = this.state;
      speakersArray.splice(index, 1)
      this.setState({speakersArray:speakersArray})
    }
    getOrganization= (str) => {
        this.setState({organization: str.value})
    }
    getContactPerson = (str) => {
        this.setState({contactPerson: str.value})
    }
    getContactPhone =(str) => {
        this.setState({contactPhone : str.value})
    }
    getWebsite =(str) => {
        this.setState({website : str.value})
    }
    render() {
        return(
            <div className = 'modal-window'> 
            <div className = 'name-place-event'>
                <TextField 
                    label = 'Название события'
                    value = {this.state.title}
                    id = "title" 
                    type = 'text' 
                    nameClass = 'event-title-input'
                    name = 'Название события' 
                    onChangeValue = {this.getValue}
                    />
                     <TextField 
                    label = 'Место проведения'
                    value = {this.state.place}
                    type = 'text' 
                    name = 'place' 
                    onChangeValue = {this.getPlace}
                    />
                </div>
                <div className = 'date-start-end-event'>
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
               <div className = 'tickets-event'>
                     <TextField 
                    label = 'Билеты'
                    value = {this.state.participation}
                    type = 'text' 
                    name = 'tickets' 
                    onChangeValue = {this.getParticipation}
                    />
                    <TextField 
                    label = 'Ссылка на регистрацию/покупку билетов'
                    value = {this.state.linkParticipation}
                    type = 'url' 
                    name = 'linkTickets' 
                    onChangeValue = {this.getLinkParticipation}
                    />
                    </div>
                    <textarea 
                        value= {this.state.organizers}
                        onChange = {this.getOrganizers}
                        placeholder = 'Введите организаторов'
                    />
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
                               return  <li key = {index}>
                                    <span> {el} </span>
                                    <Button 
                        name = "button-admin button-admin-background" 
                        label = 'Удалить' 
                        clickHandler = {(e)=> this.deleteSpeaker(e,index)}
                    />
                                    </li>
                            })
                            :null}
                            </ul>
                    </div>
                    </div>
                            <div className = 'contact-person-phone'>
                      <TextField 
                    label = 'Введите контактное лицо: '
                    value = {this.state.contactPerson}
                    type = 'text' 
                    name = 'contactPerson' 
                    onChangeValue = {this.getContactPerson}
                    />
                    <TextField 
                    label = 'Введите контактный телефон: '
                    value = {this.state.contactPhone}
                    type = 'text' 
                    name = 'contactPhone' 
                    onChangeValue = {this.getContactPhone}
                    />
                    </div>
                    <div className = 'organization-website-event'>
                    <TextField 
                    label = 'Введите организацию : '
                    value = {this.state.organization}
                    type = 'text' 
                    name = 'organization' 
                    onChangeValue = {this.getOrganization}
                    />
                     <TextField 
                    label = 'Введите адресс сайта : '
                    value = {this.state.website}
                    type = 'url' 
                    name = 'website' 
                    onChangeValue = {this.getWebsite}
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