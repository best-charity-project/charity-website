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

    componentDidMount() {
        this.setState({source: 'organizers'})
    }
    render() {
        let infoAboutNews = this.props.location.state.detail;
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
        this.setState({isPublic: true}, this.sendNews)
            /* this.props.saveNews() */ 
    }
    onCancel = () => {
        this.setState({
            title: '',
            shortText: '',
            fullText: '',
            source: '',
            isPublic: false,
            imageData: ''
        })    
        //todo: return to previous page 
    }
    onDraft = () => {
        this.setState({isPublic: false}, this.sendNews)
         /* this.props.saveNews() */ 
    }
    sendNews = () => {
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
            isPublic: false,
            imageData: ''
        })
         /* this.props.saveNews() */ 
    }
    //todo: сохранить в описании 200 символов из полного описания, если короткое не заполнено
}

export default AdminAddNews;