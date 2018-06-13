import React, {Component} from 'react';
import {Cropper} from 'react-image-cropper';
import './AdminUploadImage.css';

class AdminUploadImage extends Component {
    state = {
        url: '',
        loaded: false,
        image: '',
        previousImg:this.props.imageData
    }
    cropperRef = React.createRef() 
    cropperStyles = {container: {width: '90%'}}
    componentWillMount() {
        this.props.imageData ? 
            this.setState({image: this.props.imageData}) :
            null
    }
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
                    <div>&nbsp;</div>
                    <div>
                        <Cropper 
                            src = {this.state.url}
                            ratio = {this.props.ratio}
                            width = {350}
                            onImgLoad = {this.handleImageLoaded}
                            ref = {this.cropperRef}
                            styles = {this.cropperStyles} 
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
                           {this.state.previousImg
                            ? <img
                                className = "after-img"
                                src = {this.state.previousImg}
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
        let img = this.cropperRef.current.crop()
        this.setState({image: img})
        this.props.onCropImage(img)
    }
}

export default AdminUploadImage;

