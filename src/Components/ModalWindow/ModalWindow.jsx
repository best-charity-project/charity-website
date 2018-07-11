import React, {Component} from 'react';
import axios from 'axios';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import {server} from '../../api';
import Button from '../Button/Button';
import './ModalWindow.css';

class ModalWindow extends Component { 
    state = {
        imageData: '',
        image: '',
        imageArr: []
    }
    componentWillReceiveProps(nextProps) {
        nextProps.isOpen ? null : this.setState({imageArr: []})
        nextProps.imageArr ? this.setState({imageArr: nextProps.imageArr}) : null
    }
    
    render() {
        const SortableItem = SortableElement(({link, sortIndex}) =>
            <div className = 'admin-title-image'>
                <img src = {link} alt = '' className = 'slider-image' />
                <Button 
                    name = 'button-admin admin-cancel'
                    label = {<span aria-hidden='true'>&times;</span>} 
                    clickHandler =  {() => this.deleteGalleryImage(sortIndex)} 
                />
            </div>      
        );
        const SortableList = SortableContainer(({items}) => {
            return (
                <div className = 'image-array'>
                    {items.map((value, index) => {
                        return (
                            <SortableItem
                                key = {`item-${index}`}
                                sortIndex = {index}
                                index = {index}
                                link = {value}
                            />
                        )
                    })}
                </div>
            )
        });   

        return(
            <div className = 'modal-window-new'> 
                 <div className = 'admin-image'>
                    <label htmlFor = {this.props.id}>Фото:</label>
                    <div className = 'admin-button'>
                        <div className = 'choose-file'>
                            <span>Выберите файл</span>
                        </div>
                        <input
                            id = 'slider-image' 
                            type  = 'file'
                            name = 'slider-image'
                            onChange = {this.onChangeFile}
                            multiple
                        />
                    </div>
                </div> 
                {this.state.imageData || this.state.imageArr.length ?  
                    <SortableList 
                        items = {this.state.imageArr} 
                        onSortEnd = {this.onSortEnd} 
                        shouldCancelStart = {this.shouldCancelStart}
                        axis = 'xy' 
                        helperClass = 'sortable-helper'
                        lockToContainerEdges = {true}
                        lockOffset = '0%'
                    /> :
                    null
                }
                <div className = 'admin-buttons'>
                    {this.state.imageArr.length ?
                        <Button 
                            name = 'button-admin'
                            clickHandler = {this.props.addSlider}
                            label = 'Ok'
                        /> :
                        null
                    }
                    <Button 
                        name = 'button-admin close-window'
                        clickHandler = {this.closeModalWindow}
                        label = 'Отмена'
                    />
                </div>
                {/* {this.state.imageArr.length ?
                    <div className = 'message-info'>*При удалении картинки, кнопка "Отмена" их не вернет</div> :
                    null
                } */}
            </div>
        )
    }
    onChangeFile = (event) => {
        const imageType = /^image\//
        for (let i = 0; event.target.files[i]; i++) {
            let file = event.target.files[i]
            let reader = new FileReader()

            if (!file || !imageType.test(file.type)) {
                return
            }
            reader.onload = (e) => {
                this.setState({imageData: e.target.result}, this.addImage)
            }
            reader.readAsDataURL(file)
        }
        event.target.value = null
    }
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            imageArr: arrayMove(this.state.imageArr, oldIndex, newIndex),
        }, () => this.props.onChangeImageArr(this.state.imageArr));
    };
    shouldCancelStart = (e) => {
        console.log(333)
        if (['button', 'span'].indexOf(e.target.tagName.toLowerCase()) !== -1) {
            return true
        }
    }

    deleteGalleryImage = (index) => {
        console.log(111)
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
            }, this.props.getUrl(this.state.imageArr)) 
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