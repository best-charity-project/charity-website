import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import moment from 'moment';
import axios from 'axios';

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
        imageData: '',
        isPreview: false,
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
                {!this.state.isPreview ? 
                    <form className = "form-create-news" encType="multipart/form-data" method="post">
                        <div className = "news-status">
                            <span>{this.state.isPublic ? "Статус новости: опубликована" : "Статус новости: черновик"}</span>
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
                                imageData = {this.state.imageData}
                                onCropImage = {this.onCropImage}
                                ratio = {8 /3}
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

                    <div className = 'full-news-list-container'>
                        <div className = 'full-news'>
                            <div><img src = {this.state.imageData} alt = "" /></div > 
                            <p className = 'full-news-date'>{moment().format('DD MMMM YYYY')} </p>
                            <p className = 'full-news-title'> {this.state.title}</p>               
                            <span> {this.state.fullText}</span>
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
        this.setState({
            isPreview: true
        })
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
        let body = {
            title: this.state.title,
            shortText: this.state.shortText,
            fullText: this.state.fullText,
            source: this.state.source,
            isPublic: this.state.isPublic
        }

        fetch(`${server}/news`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            })
            .then(response => response.json())
            .then(data => data.news._id)
            .then(id => this.sendImage(id))
            this.setState({
                title: '',
                shortText: '',
                fullText: '',
                source: '',
                isPublic: false
            })
            this.props.history.push({
                pathname: '/admin-panel/news'
            })  
            /* this.props.saveNews()  */          
    }
    sendImage = (id) => {
        /* let formData  = new FormData();
        formData.append(imageData, this.state.imageData); */

        fetch(`${server}/news/` + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/octet-stream',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                }, 
            body: this.state
        })
        .then(res => res.json())
        .then(data => console.log(data))
        /* this.setState({
            imageData: ''
        }) */
         /* this.props.saveNews() */ 
    }
       /*  axios.post(`${server}/news`, {formData})
            .then(res => {
              console.log(res);
              console.log(res.data);
            })*/
        // }
     /*    axios({
            method: 'post',
            url: `${server}/news`,
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data'}},
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (response) {
            console.log(response);
        }); */
        /*
        .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });  */

        /* axios.post(`${server}/news`, {formData})
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          }); */
/*         let formData  = new FormData();
        Object.keys(this.state).forEach(key => formData.append(key, this.state[key]));
        console.log(formData);

        <Post url="${server}/news" data={formData}>
            {(error, response, isLoading, onReload) => {
            if(error) {
                return (<div>Something bad happened: {error.message} <button onClick={() => onReload({ params: { reload: true } })}>Retry</button></div>)
            }
            else if(isLoading) {
                return (<div>Loading...</div>)
            }
            else if(response !== null) {
                return (<div>{response.data.message} <button onClick={() => onReload({ params: { refresh: true } })}>Refresh</button></div>)
            }
            return (console.log('test done'))
            }}
      </Post> */
        /* let formData  = new FormData();
        Object.keys(this.state).forEach(key => formData.append(key, this.state[key])); */

        
}

export default withRouter(AdminAddNews);