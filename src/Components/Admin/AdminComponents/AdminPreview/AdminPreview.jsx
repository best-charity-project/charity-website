import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import moment from 'moment';

import AdminUploadImage from '../AdminComponents/AdminUploadImage/AdminUploadImage';
import TextField from '../../TextField/TextField';
import ControlledEditor from  '../AdminComponents/AdminEditor/AdminEditor';
import Button from '../../Button/Button';
import Navigation from '../../Navigation/Navigation';
import NavBar from '../../NavBar/NavBar';
import {server} from '../../../api';
import './AdminPreview.css';

class AdminPreview extends Component {
    render() {
        return (
            <div className = 'full-news-list-container'>
                <div className = 'full-news'>
                    <div><img src = {this.props.state.imageData} alt = "" /></div > 
                    <p className = 'full-news-date'>{moment().format('DD MMMM YYYY')} </p>
                    <p className = 'full-news-title'> {this.props.state.title}</p>               
                    <span> {this.props.state.fullText}</span>
                </div>
                <div className = 'button-info'>
                    <span>* При нажатии на кнопку "Сохранить" новость сохраняется как черновик</span>
                </div>
                <div className="admin-buttons">
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
                            clickHandler = {this.onCancelPreview}
                        />
                    )} />
                </div>
            </div>
        )
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
    onCancelPreview = (e) => {
        e.preventDefault()
        this.setState({
           isPreview: false
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
           /*  headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                }, */
            body: formData
        })
        .then(res => res.json())
        .then(data => console.log(data))
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