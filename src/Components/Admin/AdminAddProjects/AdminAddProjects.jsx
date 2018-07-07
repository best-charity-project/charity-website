import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import InputMask from 'react-input-mask';

import TextField from '../../TextField/TextField';
import AdminUploadImage from '../AdminComponents/AdminUploadImage/AdminUploadImage';
import NavBar from '../../NavBar/NavBar';
import Navigation from '../../Navigation/Navigation';
import ControlledEditor from  "../AdminComponents/AdminEditor/AdminEditor";
import Button from '../../Button/Button';
import AdminProjectPreview from '../AdminComponents/AdminProjectPreview/AdminProjectPreview'
import AdminSelectSearch from '../../Admin/AdminComponents/AdminSelectSearch/AdminSelectSearch';


import './AdminAddProjects.css';
import { server } from "../../../api";

class AdminAddProjects extends Component {
    state = {
        imageData: '',
        image:'',
        name: '',
        organization:'',
        head:'',
        headArray:[],
        contacts:'',
        contactsArray:[],
        address:'',
        site:'',
        mediaImageArray:[],
        mediaImageData:'',
        mediaImage:'',
        mediaVideoArray:[],
        mediaVideo:'',
        fullText: '',
        filter: '',
        isPublic:false,
        isPreview:false,
        value:1000,
        isRight:false
    }
    cropperRef = React.createRef()
    componentWillMount() {
        this.getFiltersList();
        if (this.props.location.state) {
            this.setState({
                image: this.props.location.state.detail.image,
                name: this.props.location.state.detail.name,
                organization:this.props.location.state.detail.organization,
                headArray:this.props.location.state.detail.headArray,
                contactsArray:this.props.location.state.detail.contactsArray,
                address:this.props.location.state.detail.address,
                site:this.props.location.state.detail.site,
                mediaImageArray:this.props.location.state.detail.mediaImageArray,
                mediaVideoArray:this.props.location.state.detail.mediaVideoArray,
                fullText: this.props.location.state.detail.fullText,
                filter: this.props.location.state.detail.filter,
                isPublic: this.props.location.state.detail.isPublic
            })
        }
    }
    
    render() {
        let newValue = this.state.fullText.replace(/<[^>]*>/g, '').replace(/\r\n/g, '').length;
        return (
            <div className="admin-content"> 
            <Navigation onLogout={this.onLogout}/>
            <NavBar />
            {!this.state.isPreview ? 
            <div className="list-container">
                <div className = "projects-status">
                    <span>Статус проекта: {this.state.isPublic ? " опубликована" : " черновик"}</span>
                    <Route render={({history}) => (
                        <Button 
                            label={"Опубликовать"}
                            name = "button-admin"
                            clickHandler = {this.onPublish}
                        />
                    )} />
                </div>
                <hr />
                <div>
                    <AdminUploadImage 
                        id = "image-projects"
                        name = "image-projects"
                        imageData = {this.state.imageData}
                        image = {this.state.image}
                        onCropImage = {this.onCropImage}
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
                        <Button
                            label = {"Добавить организатора"}
                            clickHandler = {this.addHead}
                            name = {"admin-button admin-projects-media-buttons"}
                        />
                        {this.state.headArray ?
                            <ul className="video-array">
                                { this.state.headArray.map( (link,index) =>
                                    <li className="projects-video-container" key = { index }>
                                        <span> { link } </span>
                                        <Button 
                                            name = "button-admin admin-cancel"
                                            label = {<span aria-hidden="true">&times;</span>}
                                            clickHandler = {(event) => this.deleteHead(event, index)}
                                        />
                                    </li>
                                )}
                            </ul>
                        :null}
                    </div>
                    <hr />
                    <div className="admin-contacts-projects">
                        {/* <TextField 
                            required
                            id = "contacts-projects" 
                            label = "Телефон:"
                            type = "text"
                            name = "contacts-projects"
                            value = {this.state.contacts}
                            onChangeValue = {this.getContacts}
                        /> */}
                        <div className="container-for-input">
                        <label>Телефон:</label>
                        <InputMask 
                            mask="+375 (99) 999-99-99" 
                            value = {this.state.contacts} 
                            onChange={this.getContacts}

                        />
                        </div>
                        <Button
                            label = {"Добавить телефон"}
                            clickHandler = {this.addContacts}
                            name = {"admin-button admin-projects-media-buttons"}
                        />
                        {this.state.contactsArray ?
                            <ul className="video-array">
                                { this.state.contactsArray.map( (link,index) =>
                                    <li className="projects-video-container" key = { index }>
                                        <span> { link } </span>
                                        <Button 
                                            name = "button-admin admin-cancel"
                                            label = {<span aria-hidden="true">&times;</span>}
                                            clickHandler = {(event) => this.deleteContact(event, index)}
                                        />
                                    </li>
                                )}
                            </ul>
                        :null}
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
                    <div className="admin-media-projects">
                        {/* <div className="admin-media-image-projects"> */}
                        <div className="admin-image">
                            <label>Изображение:</label>
                            <div className = {this.state.mediaImageArray.length+this.state.mediaVideoArray.length<4?"admin-button":"button-projects-dislable"}>
                                    <div className = "choose-file">
                                        <span>Выберите файл</span>
                                    </div>
                                    <input
                                        id="image-projects"
                                        name="image-projects"
                                        type  = "file"
                                        onChange = {this.onChangeFile}
                                        multiple
                                    />
                            </div>
                            
                            
                                
                                <div className="image-array">
                               
                                    {this.state.mediaImageArray.map( (link,index) =>
                                    //  {link.length !== 0 ?
                                        
                                    // { link !== '' ? 
                                        <div className="projects-gallery-container" key={index}>
                                            <img src = { link } className="projects-media-gallery" alt=""/>
                                            <Button 
                                                name = {"button-admin admin-cancel"}
                                                label = {<span aria-hidden="true">&times;</span>}
                                                clickHandler = {(event) => this.deleteGalleryImage(event, index)}
                                            />
                                        </div>
                                        // :null}
                                    )}
                                </div>
                             
                        </div>
                        <div className="admin-media-video-projects">
                        <div className="input-video-container">
                            <TextField
                                onKeyPress = {this.onKeyPress}
                                id = "video-projects" 
                                label = "Видео:"
                                type = "text"
                                name = "video-projects"
                                value = {this.state.mediaVideo}
                                onChangeValue = {this.getVideo}
                            />
                            <Button
                                label = {"Добавить видео"}
                                clickHandler = {this.addMediaVideo}
                                name = {this.state.mediaImageArray.length+this.state.mediaVideoArray.length<4?"admin-button admin-projects-media-buttons":"button-projects-dislable"}
                            />
                            </div>
                            {/* {this.state.mediaVideoArray===[] ? */}
                                <ul className="video-array">
                                    { this.state.mediaVideoArray.map( (link,index) =>
                                        <li className="projects-video-container" key = { index }>
                                            <span> { link } </span>
                                            <Button 
                                                name = "button-admin admin-cancel"
                                                label = {<span aria-hidden="true">&times;</span>}
                                                clickHandler = {(event) => this.deleteGalleryVideo(event, index)}
                                            />
                                        </li>
                                    )}
                                </ul>
                            {/* :null} */}
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="text-projects">
                    <div className="full-text-projects">Описание проекта:</div>
                    <div className="projects-textfield">
                    <ControlledEditor
                        text = {this.state.fullText} 
                        getCurrentText = {this.getCurrentTextFull}
                    />
                    <div className= { this.onCorrectValue() ? "incorrect-value-container hidden" : "incorrect-value-container" }>
                        <div>
                            <span>Количество символов превышает 1000!</span>
                        </div>
                    </div> 
                    <div className = "admin-textarea-description">
                        <span>Краткое описание не должно содержать более 1000 символов</span>
                        <div>
                            <span>Количество оставшихся символов: </span>
                            <span readOnly className = "admin-textarea-symbols">{this.state.value - newValue}</span>
                        </div>
                    </div>
                    </div>
                </div>
                <hr />
                <div className="text-projects">
                    <div className = "projects-source">
                        <label>Источник:</label>
                    </div>
                    <div>
                        {this.state.filters? 
                            <AdminSelectSearch 
                                value = {this.state.filter}
                                filtersList = {this.state.filters}
                                getFilter = {this.getFilter}
                            />
                        :null}
                    </div>
                </div>
                <hr />
                <div className="admin-buttons">
                    <Route render={({history}) => (
                        <Button 
                            disabled={!this.onRight()}
                            label = {"Предпросмотр"} 
                            name = {this.onRight()? "button-admin":"button-publish-projects"}
                            clickHandler = {this.onPreview}
                        />
                    )} />
                    <Route render={({history}) => (
                        <Button
                            disabled={!this.onRight()}
                            label={"Опубликовать"}
                            name = {this.onRight()? "button-admin":"button-publish-projects"}
                            clickHandler = {this.onPublish}
                        />
                    )} />
                    <Route render={({history}) => (
                        <Button 
                            disabled={!this.onRight()}
                            label={"Сохранить как черновик"}
                            name = {this.onRight()? "button-admin":"button-publish-projects"}
                            clickHandler = {this.onDraft}
                        />
                    )} />
                    <Route render={({history}) => (
                        <Button 
                            label={"Назад"}
                            name = "button-admin"
                            clickHandler = {this.onCancel}
                        />
                    )} />
                </div>
            </div> :
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
    getOrganization = (obj) =>{
        this.setState({organization:obj.value})
    }
    getHead = (obj) =>{
        this.setState({head:obj.value})
    }
    addHead = (e)=>{
        e.preventDefault()
        let headArray = this.state.headArray
        if(this.state.head){
            headArray.push(this.state.head)
            this.setState({
                headArray:headArray
            })
            this.setState({
                head:''
            })
        }
    }
    deleteHead = (e,index) => {
        let headArray = this.state.headArray
        let deletedHead = headArray.splice(index, 1)
        this.setState({
            headArray: headArray
        })
    }
    getContacts = (e) =>{
        this.setState({contacts:e.target.value})
    }
    addContacts = (e) => {
        e.preventDefault()
        let contactsArray = this.state.contactsArray
        if(this.state.contacts && /^\+375\s\(\d{2}\)\s\d{3}-\d{2}-\d{2}$/.test(this.state.contacts) ) {
            contactsArray.push(this.state.contacts)
            this.setState({
                contactsArray:contactsArray
            })
            this.setState({
                contacts:''
            })
        }
    }
    deleteContact = (e,index) =>{
        e.preventDefault()
        let contactsArray = this.state.contactsArray
        let deletedContacts = contactsArray.splice(index, 1)
        this.setState({
            contactsArray: contactsArray
        })
    }
    getAddress = (obj) =>{
        this.setState({address:obj.value})
    }
    getSite = (obj) =>{
        this.setState({site:obj.value})
    }
    getVideo = (obj) =>{
        this.setState({mediaVideo:obj.value})
    }
    addMediaVideo = (e) =>{
        e.preventDefault()
        let mediaVideoArray = this.state.mediaVideoArray
        if(this.state.mediaVideo && /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})\/([\w\/\-\.]+)([\?].*)?$/igm.test(this.state.mediaVideo)) {
            mediaVideoArray.push(this.state.mediaVideo)
            this.setState({
                mediaVideoArray:mediaVideoArray
            })
            this.setState({
                mediaVideo:''
            })
        }else return false
    }
    onKeyPress  = (e) => {
        (e.charCode === 13 && this.state.mediaImageArray.length+this.state.mediaVideoArray.length<4)? this.addMediaVideo(e): null;
    }
    deleteGalleryVideo = (e,index)=>{
        e.preventDefault()
        let mediaVideoArray = this.state.mediaVideoArray
        let deletedVideo = mediaVideoArray.splice(index, 1)
        this.setState({
            mediaVideoArray: mediaVideoArray
        })
    }
    getCurrentTextFull = (str) => {
        this.setState({fullText: str});
    }
    getFilter = (str) => {
        this.setState({filter: str});
    }
    onCropImage = (image) => {
        this.setState({imageData: image})
    }
    getNewStatePreview = () => {
        this.setState({
            isPreview: false
        })
    }
    onCorrectSite = () =>{
        return /^((https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\W\.-]*)*\/?)?$/.test(this.state.site)
    }
    onCorrectValue = () =>{
        let newText = this.state.fullText.replace(/<[^>]*>/g, '').replace(/\r\n/g, '')
        return newText.length<=this.state.value
    }
    onRight = ()=>{
         return this.onCorrectSite() && this.onCorrectValue() 
            
            
    //         alert('OK@@@')
    //         // this.setState ( { isRight:true } )
    //         return true
    //     }else{
    //         alert('GOVNO')
    //         return this.setState( { isRight:false } );
    //     }  
    }
    onPublish = (e) => {
        this.onRight()
        if(this.onRight()){
            this.setState({
                isPublic: true
            }, this.sendProjects)
        }
    }
    onDraft = (e) => {
        e.preventDefault()
        this.onRight()
        if(this.onRight()){
            this.setState({
                isPublic: false
            }, this.sendProjects)
        }
    }
    onPreview = (e)=>{
        e.preventDefault()
        this.onRight()
        if(this.onRight()){
            this.setState({
                isPreview:true
            })
        }
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
                mediaImageArray: []
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
    onChangeFile = (e) => {
        let type = /^image\//
        for (let i = 0; i<4; i++) {
            let reader = new FileReader(),
                file = e.target.files[i]
            if(!file || !type.test(file.type)){
                return
            }
            reader.onload = (item) => {
                this.setState({
                    mediaImageData:item.target.result
                },this.addMediaImage)
            }
            reader.readAsDataURL(file)
        }
        e.target.value=null;
    }
    addMediaImage = () => {
        let formData = new FormData();
        formData.append('imageData',this.state.mediaImageData);
            axios({
                method:'post',
                url: `${server}/uploadGalleryImage/`,
                data:formData,
                config:{
                    headers:{
                        'Content-Type':'multipart/form-data; charset=UTF-8'
                    }
                }
            })
            .then(res =>{
                let mediaImageArray = this.state.mediaImageArray
                mediaImageArray.push(res.data.link)
                this.setState({
                    mediaImageArray:mediaImageArray
                })
            })
            .catch(err=>{
                console.log(err)
            }) 
    }
    deleteGalleryImage = (e, index) => {
        e.preventDefault()
        let mediaImageArray = this.state.mediaImageArray
        let deletedImage = mediaImageArray.splice(index, 1)
        axios({
             method: 'delete',
             url: `${server}/uploadGalleryImage/`,
             data: deletedImage,
             config: {
                 headers: {
                     'Content-Type': 'application/json; charset=UTF-8'
                    }
                },
         })
         .catch(err=> {
             console.log(err);
         });
        this.setState({
            mediaImageArray: mediaImageArray
        })      
     }
    
    getFiltersList = () => {  
        axios({
            method: 'get',
            url: `${ server }/filters`,
        })
        .then(res =>{
            let filterList = res.data.filterList;
            let filtersProjects = _.filter(filterList , function(el){
                if(el.type === 'projects'){
                    return el
                }
            })
            this.setState({
                filters:filtersProjects,
            })
        })
     
      } 
}
export default withRouter(AdminAddProjects);