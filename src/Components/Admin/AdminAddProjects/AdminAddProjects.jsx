import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import axios from 'axios';

import TextField from '../../TextField/TextField';
import AdminUploadImage from '../AdminComponents/AdminUploadImage/AdminUploadImage';
import NavBar from '../../NavBar/NavBar';
import Navigation from '../../Navigation/Navigation';
import ControlledEditor from  "../AdminComponents/AdminEditor/AdminEditor";
import AdminDateEvent from '../AdminComponents/AdminDateEvent/AdminDateEvent';
import Button from '../../Button/Button';
import AdminProjectPreview from '../AdminComponents/AdminProjectPreview/AdminProjectPreview'


import './AdminAddProjects.css';
import { server } from "../../../api";

class AdminAddProjects extends Component {
    state = {
        name: '',
        date:new Date(),
        isPublic:false,
        isPreview:false,
        shortText: '',
        fullText: '',
        imageData: '',
        image:''
    }
    cropperRef = React.createRef()

    componentWillMount() {
        if (this.props.location.state) {
            let infoAboutProjects = this.props.location.state.detail;
            this.setState({
                name: this.props.location.state.detail.name,
                shortText: this.props.location.state.detail.shortText,
                fullText: this.props.location.state.detail.fullText,
                date: this.props.location.state.detail.date,
                image: this.props.location.state.detail.image,
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
                <div className="date-projects-container">
                    <AdminDateEvent onSelectData= {this.getDate} date = {this.state.date} />
                </div>
                <hr />
                <div className="admin-name-projects">
                        <TextField 
                            id = "name-projects" 
                            label = "Название проекта:"
                            type = "text"
                            name = "name-projects"
                            value = {this.state.name}
                            onChangeValue = {this.getValue}
                        />
                </div>
                <hr />
                <div>
                    <AdminUploadImage 
                        id = "image-projects"
                        name = "image-projects"
                        imageData = {this.state.imageData}
                        image = {this.state.image}
                        onCropImage = {this.onCropImage}
                        ratio = {2.5/4}
                    />
                </div>
                <hr />
                <div className="text-projects">
                    <div>Краткое описание:</div>
                        <ControlledEditor 
                            text = {this.state.shortText} 
                            getCurrentText = {this.getCurrentTextShort}
                        />
                    </div>
                <hr />
                    <div className="text-projects">
                        <div className="full-text-projects">Полное описание:</div>
                            <ControlledEditor 
                                text = {this.state.fullText} 
                                getCurrentText = {this.getCurrentTextFull}
                            /> 
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
    getDate = (str) =>{
        this.setState({date:str})
    }
    getCurrentTextFull = (str) => {
        this.setState({fullText: str});
    }
    getCurrentTextShort = (str) => {
        this.setState({shortText: str})
    }
    onCropImage = (image) => {
        this.setState({imageData: image})
    }
    getNewStatePreview = () => {
        this.setState({
            isPreview: false
        })
    }
    checkText = () => {
        if (!this.state.shortText || !this.state.shortText.replace(/<(.|\n)*?>/g, '').replace('\n', '')) {
            let newText = this.state.fullText.replace(/<img[^>]* src=\"([^\"]*)\"[^>]*>/g, '')
            if (newText.length >= 401) {newText = newText.slice(0, 400) + "</span><span>&hellip;</span></p>"}
            this.setState({shortText: newText}, this.sendProjects)
        } else {
            this.sendProjects()
        }
    }
    onPublish = (e) => {
        e.preventDefault()
        this.setState({
            isPublic: true
        }, this.checkText)
    }
    onDraft = (e) => {
        e.preventDefault()
        this.setState({
            isPublic: false
        }, this.checkText)
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
            name: '',
            imageData: '',
            shortText: '',
            fullText: '',
            isPublic: false,
            image: ''
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
                name: '',
                isPublic:false,
                shortText: '',
                fullText: '',
                imageData: '',
                image:''
            }) 
            this.props.history.push({
                pathname: '/admin-panel/projects'
            })  
        })
        .catch(function (error) {
            console.log(error);
        });
    } 
}

export default withRouter(AdminAddProjects);