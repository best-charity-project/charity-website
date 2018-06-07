import React, {Component} from 'react';
import AdminUploadImage from '../AdminComponents/AdminUploadImage/AdminUploadImage'
import TextField from '../../TextField/TextField';
import ControlledEditor from  '../AdminComponents/AdminEditor/AdminEditor';
import Button from '../../Button/Button';
import Navigation from '../../Navigation/Navigation';
import NavBar from '../../NavBar/NavBar';
import './AdminAddNews.css';

class AdminAddNews extends Component {
    state = {
        text: '',
        value: ''
    }
    cropperRef = React.createRef()
    render() {
        return (
            <div className="admin-content">
                <Navigation onLogout={this.onLogout} />
                <NavBar />
                <form encType="multipart/form-data" method="post" className = "form-create-news">
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
                            text = {this.state.text} 
                            getCurrentText = {this.getCurrentText}
                        />
                    </div>
                    <hr />
                    <div className="text-news">
                        <div className="full-text-news">Полное описание:</div>
                        <ControlledEditor 
                            text = {this.state.text} 
                            getCurrentText = {this.getCurrentText}
                        /> 
                    </div>
                    <hr />
                    <div className="text-news">
                        <div className = "news-source">
                            <label>Источник:</label>
                        </div>
                        <div>
                            <select value={this.state.value} onChange={this.handleChange}>
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
                        />
                        <Button 
                            label={"Опубликовать"}
                            name = "button-admin"
                        />
                        <Button 
                            label={"Сохранить черновик"}
                            name = "button-admin"
                        />
                        <Button 
                            label={"Отмена"}
                            name = "button-admin"
                        />
                    </div>
                </form>  
            </div>
        )
    }
    onChangeValue = () => {}
    getCurrentText = (str) => {
        this.setState({text:str});
    }
    handleChange = (event) => {
        this.setState({value: event.target.value})
    }
}

export default AdminAddNews;