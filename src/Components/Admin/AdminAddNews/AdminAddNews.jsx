import React, {Component} from 'react';
import AdminUploadImage from '../AdminComponents/AdminUploadImage/AdminUploadImage'
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
    render() {
        return (
            <div className="admin-content">
                <Navigation onLogout={this.onLogout} />
                <NavBar />
                <div className = "form-create-news">
                    <div className="admin-title-news">
                        <TextField 
                            id = "title-news" 
                            title = "Название новости:" 
                            type = "text"
                            name = "title-news"
                            onChangeValue = {this.onChangeValue}
                        />
                    </div>
                    <hr />
                    <div>
                        <AdminUploadImage 
                            id = "image-news"
                            name = "image-news"
                            
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
                        <Button 
                            label = {"Предпросмотр"} 
                            name = "button-admin"
                            clickHandler = {this.onPreview}
                        />
                        <Button 
                            label={"Опубликовать"}
                            name = "button-admin"
                            clickHandler = {this.onPublish}
                        />
                        <Button 
                            label={"Сохранить черновик"}
                            name = "button-admin"
                            clickHandler = {this.onDraft}
                        />
                        <Button 
                            label={"Отмена"}
                            name = "button-admin"
                            clickHandler = {this.onCancel}
                        />
                    </div>
                </div>  
            </div>
        )
    }
    onChangeValue = (obj) => {
        this.setState({title: obj.value});
    }
    getCurrentTextShort = (str) => {
        this.setState({shortText: str});
    }
    getCurrentTextFull = (str) => {
        this.setState({fullText: str});
    }
    handleChange = (event) => {
        this.setState({source: event.target.value})
    }
    onPreview = () => {

    }
    onPublish = () => {
        this.setState({isPublic: true}, this.onDraft)
            /* this.props.saveNews() */ 
    }
    onCancel = () => {
        this.setState({
            title: '',
            shortText: '',
            fullText: '',
            source: '',
            isPublic: '',
            imageData: ''
        })     
    }
    onDraft = () => {
        fetch(`${server}/news`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state),
        })
        .then(response => response.json())
        this.setState({
            title: '',
            shortText: '',
            fullText: '',
            source: '',
            isPublic: '',
            imageData: ''
        })
    }
    //todo: сохранить в описании 200 символов из полного описания, если короткое не заполнено
}

export default AdminAddNews;