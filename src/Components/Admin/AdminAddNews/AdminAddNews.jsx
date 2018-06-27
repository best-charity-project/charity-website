import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import moment from 'moment';
import axios from 'axios';
import _ from 'lodash';
import {server} from '../../../api';
import AdminUploadImage from '../AdminComponents/AdminUploadImage/AdminUploadImage';
import TextField from '../../TextField/TextField';
import ControlledEditor from  '../AdminComponents/AdminEditor/AdminEditor';
import Button from '../../Button/Button';
import Navigation from '../../Navigation/Navigation';
import NavBar from '../../NavBar/NavBar';
import AdminPreview from '../AdminComponents/AdminPreview/AdminPreview';
import AdminSelectSearch from '../../Admin/AdminComponents/AdminSelectSearch/AdminSelectSearch'

import './AdminAddNews.css';

class AdminAddNews extends Component {
    state = {
        title: '',
        shortText: '',
        fullText: '',
        filters: '',
        isPublic: false,
        imageData: '',
        isPreview: false,
        image: '',
        date: '',
        value: 0
    }
    cropperRef = React.createRef()

    componentWillMount() {
        this.getFiltersList()
        this.setState({
            source: 'organizers',
        })
        if (this.props.location.state) {
            let infoAboutNews = this.props.location.state.detail;

            this.setState({
                title: this.props.location.state.detail.title,
                shortText: this.props.location.state.detail.shortText,
                fullText: this.props.location.state.detail.fullText,
                source: this.props.location.state.detail.source,
                isPublic: this.props.location.state.detail.isPublic,
                image: this.props.location.state.detail.image,
                date: this.props.location.state.detail.createdAt,
                value: this.props.location.state.detail.shortText.length
            })
        }
    }

    render() {
        return (
            <div className="admin-content">
                <Navigation onLogout={this.onLogout} />
                <NavBar />
                {!this.state.isPreview ? 
                    <form className = "form-create-news" encType="multipart/form-data" method="post">
                        <div className = "news-status">
                            <span>Статус новости: {this.state.isPublic ? " опубликована" : " черновик"}</span>
                            <Route render={({history}) => (
                                <Button 
                                    label={"Опубликовать"}
                                    name = "button-admin"
                                    clickHandler = {this.onPublish}
                                />
                            )} />
                        </div>
                        <div className="admin-title-news">
                            <TextField 
                                label = "Название новости:"
                                id = "title-news" 
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
                                imageData = {this.state.imageData}
                                image = {this.state.image}
                                onCropImage = {this.onCropImage}
                                ratio = {8 /3}
                                deleteImage = {this.deleteImage}
                            />
                        </div>
                        <hr />
                        <div className="text-news">
                            <div>Краткое описание:</div>
                            <div className = "admin-textarea">
                                <textarea 
                                    rows = "5"
                                    value = {this.state.shortText}
                                    onChange = {this.getCurrentTextShort}
                                    maxLength = "300"
                                ></textarea>
                                <div className = "admin-textarea-description">
                                    <span>Краткое описание не должно содержать более 300 символов</span>
                                    <div>
                                        <span>Количество оставшихся символов: </span>
                                        <span readOnly className = "admin-textarea-symbols">{300 - this.state.value}</span>
                                    </div>
                                </div>
                            </div>
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
                                {this.state.filters? <AdminSelectSearch 
                                filtersList = {this.state.filters}
                                />:null}
                              
                            </div>
                        </div>
                        <div className = 'button-info'>
                            <span>* При нажатии на кнопку "Сохранить" новость сохраняется как черновик</span>
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
                                    label={"Сохранить"}
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
                    </form>  : 

                    <AdminPreview 
                        imageData = {this.state.imageData}
                        image = {this.state.image}
                        title = {this.state.title}
                        fullText = {this.state.fullText}
                        onPublish = {this.onPublish}
                        onDraft = {this.onDraft}
                        getNewStatePreview = {this.getNewStatePreview}
                        date = {this.state.date}
                    />
                }
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
    getCurrentTextShort = (event) => {
        this.setState({
            shortText: event.target.value,
            value: event.target.value.length
        })
    } 
    handleChange = (event) => {
        this.setState({source: event.target.value})
    }
    getNewStatePreview = () => {
        this.setState({
            isPreview: false
        })
    }
    checkText = () => {
        if (!this.state.shortText) {
            let newText = this.state.fullText.replace(/<[^>]*>/g, '').replace(/\r\n/g, '')
            newText = (newText.slice(0, 297) + '...').replace(/\n/, '')
            this.setState({shortText: newText}, this.sendNews)
        } else {
            this.sendNews()
        }
    }
    onPreview = (e) => {
        e.preventDefault()
        this.setState({
            isPreview: true
        })
    }
    onPublish = (e) => {
        e.preventDefault()
        this.setState({isPublic: true}, this.checkText)
    }
    onDraft = (e) => {
        e.preventDefault()
        this.setState({isPublic: false}, this.checkText)
    }
    onCancel = (e) => {
        e.preventDefault()
        this.setState({
            title: '',
            shortText: '',
            fullText: '',
            source: '',
            isPublic: false,
            imageData: '',
            image: ''
        }) 
        this.props.history.push({
            pathname: '/admin-panel/news'
        })  
    }
    sendNews = () => {
        let formData  = new FormData();
        Object.keys(this.state).forEach(key => formData.append(key, this.state[key]));
        let id = ''
        if (this.props.location.state) {
            id = this.props.location.state.detail._id
        }
        axios({
            method: id ? 'put' : 'post',
            url: id ? `${server}/news/` + id : `${server}/news/`,
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data; charset=UTF-8'}},
        })
        .then(response => {
            this.setState({
                title: '',
                shortText: '',
                fullText: '',
                source: '',
                isPublic: false,
                imageData: '',
                image: ''
            }) 
            this.props.history.push({
                pathname: '/admin-panel/news'
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
    getFiltersList = () => {  
        axios({
            method: 'get',
            url: `${ server }/filters`,
        })
        .then(res =>{
            let filterList = res.data.filterList;
            let filtersNews = _.filter(filterList , function(el){
                if(el.type === 'news'){
                    return el
                }
            })
            this.setState({
                filters:filtersNews,
            })
        })
     
      }
}

export default withRouter(AdminAddNews);