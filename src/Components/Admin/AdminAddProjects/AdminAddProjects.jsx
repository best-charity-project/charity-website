import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import axios from 'axios';

import TextField from '../../TextField/TextField';
import AdminUploadImage from '../AdminComponents/AdminUploadImage/AdminUploadImage';
import NavBar from '../../NavBar/NavBar';
import Navigation from '../../Navigation/Navigation';
import ControlledEditor from  "../AdminComponents/AdminEditor/AdminEditor";
// import AdminDateEvent from '../AdminComponents/AdminDateEvent/AdminDateEvent';
import Button from '../../Button/Button';
import AdminProjectPreview from '../AdminComponents/AdminProjectPreview/AdminProjectPreview'


import './AdminAddProjects.css';
import { server } from "../../../api";

class AdminAddProjects extends Component {
    state = {
        imageData: '',
        image:'',
        name: '',
        // date:new Date(),
        // shortText: '',
        organization:'',
        head:'',
        contacts:'',
        address:'',
        site:'',
        video:'',
        fullText: '',
        source: '',
        isPublic:false,
        isPreview:false,
    }
    cropperRef = React.createRef()
    componentWillMount() {
        if (this.props.location.state) {
            // let infoAboutProjects = this.props.location.state.detail;
            this.setState({
                image: this.props.location.state.detail.image,
                name: this.props.location.state.detail.name,
                // shortText: this.props.location.state.detail.shortText,
                organization:this.props.location.state.detail.organization,
                head:this.props.location.state.detail.head,
                contacts:this.props.location.state.detail.contacts,
                address:this.props.location.state.detail.address,
                site:this.props.location.state.detail.site,
                video:this.props.location.state.detail.video,
                fullText: this.props.location.state.detail.fullText,
                source: this.props.location.state.detail.source,
                // date: this.props.location.state.detail.date,
                isPublic: this.props.location.state.detail.isPublic
            })
        }
    }
    
    render() {
        return (
            <div className="admin-content"> 
            <Navigation onLogout={this.onLogout}/>
            <NavBar />
            {!this.state.isPreview ? 
            <form className="list-container" encType="multipart/form-data" method="post">
                <div className = "projects-status">
                    <span>Статус проекта: {this.state.isPublic ? " опубликована" : " черновик"}</span>
                </div>
                {/* <div className="date-projects-container">
                    <AdminDateEvent onSelectData= {this.getDate} date = {this.state.date} />
                </div> */}
                 <hr />
                <div>
                    <AdminUploadImage 
                        id = "image-projects"
                        name = "image-projects"
                        imageData = {this.state.imageData}
                        image = {this.state.image}
                        onCropImage = {this.onCropImage}
                        // ratio = {3.5/5}
                        deleteImage = {this.deleteImage}
                    />
                </div>
                <hr />
                <div className='admin-projects-text-container'>
                <div className="admin-name-projects">
                        <TextField 
                            required
                            id = "name-projects" 
                            label = "Название проекта:"
                            type = "text"
                            name = "name-projects"
                            value = {this.state.name}
                            onChangeValue = {this.getValue}
                        />
                </div>
                <hr />
                <div className="admin-organization-projects">
                        <TextField 
                            id = "organization-projects" 
                            label = "Организация:"
                            type = "text"
                            name = "organization-projects"
                            value = {this.state.organization}
                            onChangeValue = {this.getOrganization}
                        />
                </div>
                <hr />
                <div className="admin-head-projects">
                        <TextField 
                            required
                            id = "head-projects" 
                            label = "Руководитель проекта:"
                            type = "text"
                            name = "head-projects"
                            value = {this.state.head}
                            onChangeValue = {this.getHead}
                        />
                </div>
                <hr />
                <div className="admin-contacts-projects">
                        <TextField 
                            required
                            id = "contacts-projects" 
                            label = "Контакты:"
                            type = "text"
                            name = "contacts-projects"
                            value = {this.state.contacts}
                            onChangeValue = {this.getContacts}
                        />
                </div>
                <div className="admin-address-projects">
                        <TextField 
                            required
                            id = "address-projects" 
                            label = "Адрес:"
                            type = "text"
                            name = "address-projects"
                            value = {this.state.address}
                            onChangeValue = {this.getAddress}
                        />
                </div>
                <div className="admin-site-projects">
                        <TextField
                            id = "site-projects" 
                            label = "Сайт:"
                            type = "text"
                            name = "site-projects"
                            value = {this.state.site}
                            onChangeValue = {this.getSite}
                        />
                </div>
                <hr />
                <div className="admin-video-projects">
                        <TextField
                            id = "video-projects" 
                            label = "Видео:"
                            type = "text"
                            name = "video-projects"
                            value = {this.state.video}
                            onChangeValue = {this.getVideo}
                        />
                </div>
                <hr />
                </div>
                {/* <div className="text-projects">
                    <div>Краткое описание:</div>
                        <div className = "admin-textarea">
                            <textarea 
                                    rows = "5"
                                    value = {this.state.shortText}
                                    onChange = {this.getCurrentTextShort}
                                    maxLength = "300"
                            ></textarea>
                        </div>
                </div> */}
                <div className="text-projects">
                    <div className="full-text-projects">Описание проекта:</div>
                    <ControlledEditor
                        required 
                        text = {this.state.fullText} 
                        getCurrentText = {this.getCurrentTextFull}
                    /> 
                </div>
                <hr />
                <div className="text-projects">
                            <div className = "projects-source">
                                <label>Источник:</label>
                            </div>
                            <div>
                                <select value={this.state.source} onChange={this.handleChange}>
                                    
                                    <option value="creative">Творческие</option>
                                    <option value="rehabilitative">Реабилитационные</option>
                                    <option value="educational">Образовательные</option>
                                    <option value="working">Трудовые</option>
                                    <option value="other">Другие</option>
                                    <option value="sport">Спортивные</option>
                                </select>
                            </div>
                </div>
                <hr />
                <div className="admin-buttons">
                    <Route render={({history}) => (
                        <Button 
                            label = {"Предпросмотр"} 
                            name = "button-admin"
                            clickHandler = {this.onPreview}
                        />
                    )} />
                    <Route render={({history}) => (
                        <Button 
                            label={"Опубликовать"}
                            name = "button-admin"
                            clickHandler = {this.onPublish}
                        />
                    )} />
                    <Route render={({history}) => (
                        <Button 
                            label={"Сохранить как черновик"}
                            name = "button-admin"
                            clickHandler = {this.onDraft}
                        />
                    )} />
                    <Route render={({history}) => (
                        <Button 
                            label={"Отмена"}
                            name = "button-admin"
                            clickHandler = {this.onCancel}
                        />
                    )} />
                </div>
            </form> :
            <AdminProjectPreview 
            imageData = {this.state.imageData}
            image = {this.state.image}
            name = {this.state.name}
            organization = {this.state.organization}
            head = {this.state.head}
            contacts = {this.state.contacts}
            address = {this.state.address}
            site = {this.state.site}
            video = {this.state.video}
            fullText = {this.state.fullText}
            // date = {this.state.date}
            onPublish = {this.onPublish}
            onDraft = {this.onDraft}
            getNewStatePreview = {this.getNewStatePreview}
            />
            } 
            </div>
        )
    }
    getValue = (obj) => {
        this.setState({name: obj.value});
    }
    // getDate = (str) =>{
    //     this.setState({date:str})
    // }
    getOrganization = (obj) =>{
        this.setState({organization:obj.value})
    }
    getHead = (obj) =>{
        this.setState({head:obj.value})
    }
    getContacts = (obj) =>{
        this.setState({contacts:obj.value})
    }
    getAddress = (obj) =>{
        this.setState({address:obj.value})
    }
    getSite = (obj) =>{
        this.setState({site:obj.value})
    }
    getVideo = (obj) =>{
        this.setState({video:obj.value})
    }
    getCurrentTextFull = (str) => {
        this.setState({fullText: str});
    }
    handleChange = (event) => {
        this.setState({source: event.target.value})
    }
    // getCurrentTextShort = (obj) => {
    //     this.setState({shortText: obj.value})
    // }
    onCropImage = (image) => {
        this.setState({imageData: image})
    }
    getNewStatePreview = () => {
        this.setState({
            isPreview: false
        })
    }
    // checkText = () => {
    //     if (!this.state.shortText) {
    //         let newText = this.state.fullText.replace(/<[^>]*>/g, '').replace(/\r\n/g, '')
    //         newText = newText.slice(0, 297) + '...'
    //         this.setState({shortText: newText}, this.sendProjects)
    //     } else {
    //         this.sendProjects()
    //     }
    // }
    onPublish = (e) => {
        e.preventDefault()
        this.setState({
            isPublic: true
        }, this.sendProjects)
    }
    onDraft = (e) => {
        console.log('sdads')
        e.preventDefault()
        this.setState({
            isPublic: false
        }, this.sendProjects)
    }
    onPreview = (e)=>{
        e.preventDefault()
        this.setState({
            isPreview:true
        })
    }
    onCancel = (e) => {
        e.preventDefault()
        this.setState({
            imageData: '',
            image: '',
            name: '',
            organization:'',
            head:'',
            contacts:'',
            address:'',
            site:'',
            video:'',
            fullText: '',
            isPublic: false,
        }) 
        this.props.history.push({
            pathname: '/admin-panel/projects'
        })  
    }
    sendProjects = () =>{
        let formData  = new FormData();
        Object.keys(this.state).forEach(key => formData.append(key, this.state[key]));

        let id = ''
        if (this.props.location.state) {
            id = this.props.location.state.detail._id
        }
        axios({
            method: id ? 'put' : 'post',
            url: id ? `${server}/projects/${id}` : `${server}/projects/`,
            data: formData,
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data; charset=UTF-8'
                }
            },
        })
        .then(response=>{
            this.setState({
                imageData: '',
                image: '',
                name: '',
                organization:'',
                head:'',
                contacts:'',
                address:'',
                site:'',
                video:'',
                fullText: '',
                isPublic: false,
            }) 
            this.props.history.push({
                pathname: '/admin-panel/projects'
            })  
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    deleteImage = () => {
        this.setState({
            imageData: '',
            image: ''
        })   
    } 
}

export default withRouter(AdminAddProjects);