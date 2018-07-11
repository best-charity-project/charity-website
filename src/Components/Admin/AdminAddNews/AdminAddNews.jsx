import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import axios from 'axios';
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import _ from 'lodash';

import {server} from '../../../api';
import AdminUploadImage from '../AdminComponents/AdminUploadImage/AdminUploadImage';
import TextField from '../../TextField/TextField';
import ControlledEditor from  '../AdminComponents/AdminEditor/AdminEditor';
import Button from '../../Button/Button';
import Navigation from '../../Navigation/Navigation';
import NavBar from '../../NavBar/NavBar';
import AdminPreview from '../AdminComponents/AdminPreview/AdminPreview';
import AdminSelectSearch from '../../Admin/AdminComponents/AdminSelectSearch/AdminSelectSearch';

import './AdminAddNews.css';

class AdminAddNews extends Component {
    state = {
        title: '',
        shortText: '',
        fullTextEditorState: EditorState.createEmpty(),
        filter: '',
        isPublic: false,
        imageData: '',
        isPreview: false,
        image: '',
        date: '',
        value: 0,
        filters: []
    }
    cropperRef = React.createRef()

    componentWillMount() {
        this.getFiltersList();
        if (this.props.location.state) {
            let fullTextEditorState = EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.location.state.detail.fullText)));
            console.log('AdminAddNews.componentWillMount', convertToRaw(fullTextEditorState.getCurrentContent()))
            this.setState({
                title: this.props.location.state.detail.title,
                shortText: this.props.location.state.detail.shortText,
                fullTextEditorState: fullTextEditorState,
                isPublic: this.props.location.state.detail.isPublic,
                image: this.props.location.state.detail.image,
                filter: this.props.location.state.detail.filter,
                date: this.props.location.state.detail.createdAt,
                value: this.props.location.state.detail.shortText.length
            })
        }
    }

    render() {
        console.log('AdminAddNews.render', convertToRaw(this.state.fullTextEditorState.getCurrentContent()))
        return (
            <div className="admin-content">
                <Navigation onLogout={this.onLogout} />
                <NavBar />
                {!this.state.isPreview ? 
                    <div className = "create-news">
                        <div className = "news-status">
                            <span>Статус новости: {this.state.isPublic ? " опубликована" : " черновик"}</span>
                            <Route render={({history}) => (
                                <Button 
                                    label={this.state.isPublic ? "Отменить публикацию" : "Опубликовать"}
                                    name = "button-admin"
                                    clickHandler = {this.onSaveChangeStatus}
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
                                initialEditorState = {this.state.fullTextEditorState} 
                                onEditorStateChange = {this.onEditorStateChange}
                            />
                        </div>
                        <hr />
                        <div className="text-news">
                            <div className = "news-source">
                                <label>Источник:</label>
                            </div>
                            <div>
                                {this.state.filters? 
                                    <AdminSelectSearch 
                                        value = {this.state.filter}
                                        filtersList = {this.state.filters}
                                        getFilter = {this.getFilter}
                                    />:null}
                              
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
                                    label={this.state.isPublic ? "Отменить публикацию" : "Опубликовать"}
                                    name = "button-admin"
                                    clickHandler = {this.onSaveChangeStatus}
                                />
                            )} />
                            <Route render={({history}) => (
                                <Button 
                                    label={this.state.isPublic ? "Сохранить" : "Сохранить без публикации"}
                                    name = "button-admin"
                                    clickHandler = {this.checkText}
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
                    </div>  : 

                    <AdminPreview 
                        imageData = {this.state.imageData}
                        image = {this.state.image}
                        title = {this.state.title}
                        fullTextEditorState = {this.state.fullTextEditorState}
                        onSaveChangeStatus = {this.onSaveChangeStatus}
                        sendNews = {this.sendNews}
                        getNewStatePreview = {this.getNewStatePreview}
                        date = {this.state.date}
                        isPublic = {this.state.isPublic}
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
    onEditorStateChange = (editorState) => {
        console.log('AdminAddNews.onEditorStateChange', convertToRaw(editorState.getCurrentContent()))
        this.setState({fullTextEditorState: editorState});
    }
    getCurrentTextShort = (event) => {
        this.setState({
            shortText: event.target.value,
            value: event.target.value.length
        })
    } 
    getNewStatePreview = () => {
        this.setState({
            isPreview: false
        })
    }
    getFilter = (str) => {
        this.setState({filter: str});
    }
    checkText = () => {
        if (this.state.fullTextEditorState) {
            if (!this.state.shortText) {
                let fullText = draftToHtml(convertToRaw(this.state.fullTextEditorState.getCurrentContent()))
                let newText = fullText.replace(/<[^>]*>/g, '').replace(/\r\n/g, '')
                if (newText.length > 300) {
                    newText = (newText.slice(0, 297) + '...').replace(/\n/, '')
                } else {
                    newText = newText.replace(/\n/, '')
                }
                this.setState({shortText: newText}, this.sendNews)
            } else {
                this.sendNews()
            }
        }
    }
    onPreview = () => {
        this.setState({
            isPreview: true
        })
    }
    onSaveChangeStatus = () => {
        this.setState({isPublic: !this.state.isPublic}, this.checkText)
    }
    onPublish = () => {
        this.setState({isPublic: true}, this.checkText)
    }
    onDraft = () => {
        this.setState({isPublic: false}, this.checkText)
    }
    onCancel = () => {
        this.setState({
            title: '',
            shortText: '',
            fullTextEditorState: EditorState.createEmpty(),
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
        formData.append('fullText', JSON.stringify(convertToRaw(this.state.fullTextEditorState.getCurrentContent())))
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
                fullTextEditorState: EditorState.createEmpty(),
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