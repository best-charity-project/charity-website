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
    render() {
        return(
            <div className = 'modal-window-new'> 
                <AdminUploadImage 
                    id = "image"
                    name = "image"
                    imageData = {this.state.imageData}
                    image = {this.state.image}
                    onCropImage = {this.onCropImage}
                    ratio = {8 /3}
                    deleteImage = {this.deleteImage}
                />
                {this.state.imageData ?
                    <Button 
                        name = "button-admin align"
                        clickHandler = {this.addImage}
                        label = "Добавить"
                    /> :
                null}
                <div>
                    {this.state.imageArr.map((link, index) =>
                        <div className = 'admin-title-image' key = {index} >
                            <img src = {link} alt = '' className = 'slider-image'/>
                            <Button 
                                name = "button-admin admin-cancel"
                                label = {<span aria-hidden="true">&times;</span>}
                                clickHandler = {this.deleteGalleryImage}
                            />
                        </div>
                    )}
                </div>
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
                        clickHandler = {this.props.closeModalWindow}
                        label = "Отмена"
                    />
                </div>
            </div>
        )
    }
    onCropImage = (image) => {
        this.setState({imageData: image})
    }
    deleteImage = () => {
        this.setState({
            imageData: '',
            image: ''
        })   
    }
    deleteGalleryImage = (e) => {
        e.preventDefault()
        // todo!!!!!!!!!!!!!!!!!!!!!!!! 
    }
    addImage = (e) => {
        e.preventDefault()
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
}
export default ModalWindow;