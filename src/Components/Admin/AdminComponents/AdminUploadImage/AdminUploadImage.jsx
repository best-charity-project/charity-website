import React, {Component} from 'react';
import {Cropper} from 'react-image-cropper';
import './AdminUploadImage.css';

class AdminUploadImage extends Component {
    state = {
        url: '',
        loaded: false,
        image: '',
        styles: {
            container: {width: '90%'}
        }
    }
    cropperRef = React.createRef()
    render() {
        return (
            <div>
                <div className = "admin-image">
                    <label htmlFor = {this.props.id}>Фото:</label>
                    <div className = "admin-button">
                        <div className = "choose-file">
                            <span>Выберите файл</span>
                        </div>
                        <input
                            id = {this.props.id} 
                            type  = "file"
                            name = {this.props.name}
                            onChange = {this.onChangeFile}
                        />
                    </div>
                </div>  
                <div className = "position-cropper">
                    <div></div>
                    <div>
                        <Cropper 
                            src = {this.state.url}
                            ratio = {16 / 9}
                            width = {350}
                            onImgLoad = {this.handleImageLoaded}
                            ref = {this.cropperRef}
                            styles = {this.state.styles} 
                            originX = {200}
                            originY = {100}
                        />
                        <br />
                        {this.state.loaded 
                            ? <div>
                                <button onClick = {this.handleClick} className = "admin-button">Обрезать
                                </button> 
                                <div className = "preview-image">Просмотр изображения</div>
                                </div>
                            : null
                        }
                        {this.state.image
                            ? <img
                                className = "after-img"
                                src = {this.state.image}
                                alt = ""
                            />
                            : null
                        }
                    </div>
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
            this.setState({url: e.target.result})
        }
        reader.readAsDataURL(file)
    }
    handleImageLoaded = () => {
        this.setState({loaded: true})
    }
    handleClick = (e) => {
        e.preventDefault()
        this.setState({image: this.cropperRef.current.crop()})
    }
}

export default AdminUploadImage;

