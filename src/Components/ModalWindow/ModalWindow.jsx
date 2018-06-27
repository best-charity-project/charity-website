import React, {Component} from 'react';
import AdminUploadImage from '../Admin/AdminComponents/AdminUploadImage/AdminUploadImage';
import Button from '../Button/Button';
/* import Button from '../../../Button/Button'; */
import './ModalWindow.css';
import axios from 'axios';
import {server} from '../../api';

class ModalWindow extends Component { 
    state = {
        imageData: '',
        image: '',
        imageArr: []
    }
    cropperRef = React.createRef()

    componentWillReceiveProps(nextProps) {
        nextProps.isOpen ? null : this.setState({imageArr: []})
    }

    render() {
        return(
            <div className = 'modal-window-new'> 
                {/* <AdminUploadImage 
                    id = "image"
                    name = "image"
                    imageData = {this.state.imageData}
                    image = {this.state.image}
                    onCropImage = {this.onCropImage}
                    ratio = {8 /3}
                    deleteImage = {this.deleteImage}
                /> */}
                <div className = "admin-image">
                    <label htmlFor = {this.props.id}>Фото:</label>
                    <div className = "admin-button">
                        <div className = "choose-file">
                            <span>Выберите файл</span>
                        </div>
                        <input
                            id = "slider-image" 
                            type  = "file"
                            name = "slider-image"
                            onChange = {this.onChangeFile}
                        />
                    </div>
                </div> 
                {this.state.imageData
                    ? /* <div className = 'admin-title-image'> 
                        <img
                            className = "after-img"
                            src = {this.state.imageData}
                            alt = ""
                        />
                        <Button 
                            name = "button-admin admin-cancel"
                            label = {<span aria-hidden="true">&times;</span>}
                            clickHandler = {this.deleteImage}
                        />
                        </div>                            
                    : null} 
                {this.state.imageData ?
                    <Button 
                        name = "button-admin add-image"
                        clickHandler = {this.addImage}
                        label = "Добавить"
                    /> :
                null} */
                <div className = "image-array">
                    {this.state.imageArr.map((link, index) =>
                        <div className = 'admin-title-image' key = {index} >
                            <img src = {link} alt = '' className = 'slider-image'/>
                            <Button 
                                name = "button-admin admin-cancel"
                                label = {<span aria-hidden="true">&times;</span>}
                                clickHandler = {(event) => this.deleteGalleryImage(event, index)}
                            />
                        </div>
                    )}
                </div>
                : null}
                <div className = 'admin-buttons'>
                    {this.state.imageArr.length ?
                        <Button 
                            name = "button-admin"
                            clickHandler = {this.props.addSlider}
                            label = "Ok"
                        /> :
                        null}
                    <Button 
                        name = "button-admin close-window"
                        clickHandler = {this.closeModalWindow}
                        label = "Отмена"
                    />
                </div>
            </div>
        )
    }
    onChangeFile = (event) => {
        const imageType = /^image\//
        const file = event.target.files.item(0)
        const reader = new FileReader()

        if (!file || !imageType.test(file.type)) {
            return
        }

        reader.onload = (e) => {
            this.setState({imageData: e.target.result}, this.addImage)
        }
        reader.readAsDataURL(file)
        event.target.value = null
    }
    deleteGalleryImage = (event, index) => {
       event.preventDefault()
       let imageArr = this.state.imageArr
       let deletedImage = imageArr.splice(index, 1)
       axios({
            method: 'delete',
            url: `${server}/uploadGalleryImage/`,
            data: deletedImage,
            config: {headers: {'Content-Type': 'application/json; charset=UTF-8'}},
        })
        .catch(function (error) {
            console.log(error);
        });
       this.setState({
           imageArr: imageArr
       })      
    }
    addImage = () => {
        let formData  = new FormData();
        formData.append('imageData', this.state.imageData);
        axios({
            method: 'post',
            url: `${server}/uploadGalleryImage/`,
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data; charset=UTF-8'}},
        })
        .then(response => {
            let imageArr = this.state.imageArr
            imageArr.push(response.data.link)
            this.setState({
                imageArr: imageArr
            }, () => this.props.getUrl(this.state.imageArr)) 
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    closeModalWindow = (e) => {
        e.preventDefault()
        this.setState({
            imageArr: []
        })
    }
}
export default ModalWindow;