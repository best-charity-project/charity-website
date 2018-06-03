import React, {Component} from 'react';
import {Cropper} from 'react-image-cropper';
import TextField from '../../TextField/TextField';
import './AdminAddNews.css';

class AdminAddNews extends Component {
    state = {
        url: '',
        loaded: false,
        image: ''
    }
    cropperRef = React.createRef()
    render() {
        return (
            <form encType="multipart/form-data" method="post">
                <TextField 
                    id="title-news" 
                    title="Название новости:" 
                    type="text"
                    name="title-news"
                />
                <div>
                    <label htmlFor="image-news">Фото:</label>
                    <input
                        id="image-news" 
                        type="file"
                        name="image-news"
                        onChange={this.onChangeFile}
                    />
                     <Cropper 
                        src={this.state.url}
                        ratio={16 / 9}
                        width={300}
                        onImgLoad={this.handleImageLoaded}
                        ref={this.cropperRef}
                    />
                    <br />
                    {this.state.loaded 
                        ? <div>
                            <button onClick={this.handleClick}>Обрезать
                            </button> 
                            <h4>Просмотр изображения</h4>
                          </div>
                        : null
                    }
                    {this.state.image
                        ? <img
                            className="after-img"
                            src={this.state.image}
                            alt=""
                        />
                        : null
                    }
                </div>
                
                {/* <div>Дата создания</div>
                <div>Опубликовано</div>
                <div>Удалить новость</div> */}
            </form>  
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

export default AdminAddNews;