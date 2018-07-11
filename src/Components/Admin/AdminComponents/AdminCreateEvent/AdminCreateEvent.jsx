import React, {Component} from 'react';
import AdminDatePicker from '../AdminDatePicker/AdminDatePicker';
import Navigation from '../../../Navigation/Navigation';
import NavBar from '../../../NavBar/NavBar';
import Button from '../../../Button/Button';
import TextField from '../../../TextField/TextField';
import './AdminCreateEvent.css';
import { server } from '../../../../api';
import Editor from  "../AdminEditor/AdminEditor";
import axios from 'axios';
import AdminSelectSearch from '../AdminSelectSearch/AdminSelectSearch';
import _ from 'lodash';

class AdminCreateEvent extends Component { 
    state = {
        title: '',
        place:'',
        dateStart:new Date(),
        dateEnd:new Date(),
        participation: '',
        linkParticipation:'',
        organizers:'',
        speaker: '',
        speakersArray : [],
        contactPerson:'',
        contactPhone:'',
        organization:'',
        website :'',
        text : '',
       
        
    }
    componentDidMount (){
        this.getFiltersList();
        if(this.props.location.state){
            let {title,
                place,
                dateStart,
                dateEnd,
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
               this.setState({
                   id:_id,
                   dateStart: dateStart,
                   dateEnd: dateEnd,
                   text:text,
                   title:title,
                   getInfo:false,
                   contactPerson: contactPerson,
                   contactPhone:contactPhone,
                   linkParticipation: linkParticipation,
                   organization:organization,
                   place:place,
                   speakersArray: speakersArray,
                   website : website,
                   participation: participation,
                   organizers: organizers,
                   filter:filter
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
            .then(data =>{
                this.setState({
                    title:'', text:'',
                    dateStart:new Date(),
                    dateEnd:new Date(), 
                    contactPerson:'',
                    contactPhone:'',
                    linkParticipation:'',
                    organization:'',
                    place:'',
                    speakersArray:'',
                    website :'',
                    participation:''
                })
                this.props.history.push({
                    pathname: '/admin-panel/events'
                }) 
            } )
        
                     
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
                            required
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
                    />
                    </div>
                    <div className = 'date-end-event'>
                        <AdminDatePicker 
                            date = {this.state.dateEnd} 
                            onSelectDate = {this.getEndDate} 
                            label = 'Дата окончания'
                    />
                    </div >
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
                                    return  <li key = {index}>
                                            <span> {el} </span>
                                            <Button 
                                name = "event-delete-button" 
                                label = '&#215;' 
                                clickHandler = {(e)=> this.deleteSpeaker(e,index)}
                            />
                                            </li>
                                    })
                                    :null}
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
                    <Editor text = {this.state.text} getCurrentText = {this.getCurrentText}/>
                    <div className = 'select-wrapper-event'>
                        {this.state.filters? 
                            <AdminSelectSearch 
                                value = {this.state.filter}
                                filtersList = {this.state.filters}
                                getFilter = {this.getFilter}
                             />:null}
                              
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
    getFilter = (str) => {
        this.setState({filter: str});
    }
      sendEvent= () => {
        let id = ''
        if (this.props.location.state) {
            id = this.props.location.state.detail._id
        }
        console.log(this.state)
        axios({
            method: id ? 'put' : 'post',
            url: id ? `${server}/events/` + id : `${server}/events/`,
            data: this.state,
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
        e.preventDefault()
        this.props.history.push({
            pathname: '/admin-panel/events'
        })  
    }

     updateEvent = () =>{
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
            })
            this.setState({
                filters:filtersEvents,
            })
        })
     
      } 
}
export default AdminCreateEvent;