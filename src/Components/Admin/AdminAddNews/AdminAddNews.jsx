import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {withRouter} from "react-router-dom";

import AdminUploadImage from '../AdminComponents/AdminUploadImage/AdminUploadImage';
import TextField from '../../TextField/TextField';
import ControlledEditor from  '../AdminComponents/AdminEditor/AdminEditor';
import Button from '../../Button/Button';
import Navigation from '../../Navigation/Navigation';
import NavBar from '../../NavBar/NavBar';
import {server} from '../../../api';
import './AdminAddNews.css';

class AdminAddNews extends Component {
    state = {
        title: '',
        shortText: '',
        fullText: '',
        source: '',
        isPublic: false,
        imageData: ''
    }
    cropperRef = React.createRef()

    componentDidMount() {
        this.setState({source: 'organizers'})
        if (this.props.location.state) {
            let infoAboutNews = this.props.location.state.detail;
            this.setState({
                title: this.props.location.state.detail.title,
                shortText: this.props.location.state.detail.shortText,
                fullText: this.props.location.state.detail.fullText,
                source: this.props.location.state.detail.source,
                isPublic: this.props.location.state.detail.isPublic,
                imageData: this.props.location.state.detail.imageData
            })
        }
    }
    render() {
        return (
            <div className="admin-content">
                <Navigation onLogout={this.onLogout} />
                <NavBar />
                <form className = "form-create-news" encType="multipart/form-data" method="post">
                    <div className="admin-title-news">
                        <TextField 
                            id = "title-news" 
                            title = "Название новости:" 
                            type = "text"
                            name = "title-news"
                            value = {this.state.title}
                            onChangeValue = {this.onChangeValue}
                        />
                    </div>
                    <hr />
                    <div>
                        <AdminUploadImage 
                            id = "image-news"
                            name = "image-news"
                            onCropImage = {this.onCropImage}
                        />
                    </div>
                    <hr />
                    <div className="text-news">
                        <div>Краткое описание:</div>
                        <ControlledEditor 
                            text = {this.state.shortText} 
                            getCurrentText = {this.getCurrentTextShort}
                        />
                    </div>
                    <hr />
                    <div className="text-news">
                        <div className="full-text-news">Полное описание:</div>
                        <ControlledEditor 
                            text = {this.state.fullText} 
                            getCurrentText = {this.getCurrentTextFull}
                        /> 
                    </div>
                    <hr />
                    <div className="text-news">
                        <div className = "news-source">
                            <label>Источник:</label>
                        </div>
                        <div>
                            <select value={this.state.source} onChange={this.handleChange}>
                                <option value="organizers">Организаторы</option>
                                <option value="sponsors">Спонсоры</option>
                                <option value="activists">Активисты</option>
                                <option value="volunteers">Волонтеры</option>
                            </select>
                        </div>
                    </div>
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
                                label={"Сохранить черновик"}
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
                </form>   
            </div>
        )
    }
    onCropImage = (image) => {
        this.setState({imageData: image})
    }
    onChangeValue = (object) => {
        this.setState({title: object.value});
    }
    getCurrentTextFull = (str) => {
        this.setState({fullText: str});
    }
    getCurrentTextShort = (str) => {
        this.setState({shortText: str})
    }
    handleChange = (event) => {
        this.setState({source: event.target.value})
    }
    checkText = () => {
        if (!this.state.shortText) {
            let newText = this.state.fullText.slice(0, 200) 
            if (this.state.fullText.length >= 201) {newText = newText + "..."}
            this.setState({shortText: newText}, this.sendNews)
        } else {
            this.sendNews()
        }
    }
    onPreview = (e) => {
        e.preventDefault()
        /* this.props.history.push({
            pathname: '/admin-panel/news'
        })   */
    }
    onPublish = (e) => {
        e.preventDefault()
        this.setState({isPublic: true}, this.checkText)
            /* this.props.saveNews() */ 
    }
    onCancel = (e) => {
        e.preventDefault()
        this.setState({
            title: '',
            shortText: '',
            fullText: '',
            source: '',
            isPublic: false,
            imageData: ''
        }) 
        this.props.history.push({
            pathname: '/admin-panel/news'
        })  
    }
    onDraft = (e) => {
        e.preventDefault()
        this.setState({isPublic: false}, this.checkText)
         /* this.props.saveNews() */ 
    }
    sendNews = () => {
        let formData  = new FormData();
        Object.keys(this.state).forEach(key => formData.append(key, this.state[key]));

        fetch(`${server}/news`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                },
            body: formData
        })
        .then(response => console.log(JSON.stringify(response)) /* .json())  */)
        this.setState({
            title: '',
            shortText: '',
            fullText: '',
            source: '',
            isPublic: false,
            imageData: ''
        })
        this.props.history.push({
            pathname: '/admin-panel/news'
        })  
         /* this.props.saveNews() */ 
    }
}

export default withRouter(AdminAddNews);