import React, {Component} from 'react';
import {ContentState, /* convertToRaw, */ EditorState, Modifier, convertFromHTML} from 'draft-js';
import PropTypes from 'prop-types';
/* import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs'; */
/* import {server} from '../../../../api';
import axios from 'axios'; */
import ModalWindow from '../../../ModalWindow/ModalWindow';
import slider from '../../../../Assets/AssetsSvg/mbri-image-slider.svg'
import './AdminSlider.css';

class AdminSlider extends Component {
    state = {
        isOpen: false,
        imageArr: []
    }
    static propTypes = {
        onChange: PropTypes.func,
        editorState: PropTypes.object
    }
    render() {
        return (
            <div className = 'rdw-option-wrapper' aria-selected = 'false' title = {!this.state.isOpen ? 'Слайдер' : null} onClick = {this.openModalWindow}>
                <img src = {slider} alt = '' />
                <div className = {this.state.isOpen ? 'overlay' : 'overlay hidden'} onClick = {this.closeModalWindow}>
                    <div className="modal-element">
                        <ModalWindow 
                            getUrl = {this.getUrl}
                            addSlider = {this.addSlider}
                            isOpen = {this.state.isOpen}
                        />
                    </div>
                </div>
          </div>
        );
    }
    openModalWindow = () => {
        this.setState({isOpen: true})
    }
    closeModalWindow = (e) => {
        if (e.target.className === 'overlay' || ~e.target.className.indexOf('close-window')) {
            e.preventDefault()
            e.stopPropagation()
            this.setState({
                isOpen: false,
                imageArr: []
            })
        } 
    }
    addSlider = (e) => {
        e.preventDefault()
        e.stopPropagation() 
        let str = '<div class = "slider-image">' 
        this.state.imageArr.forEach((item) => {
            str += '<img src = "' + item + '" alt = "" />'
        })
        str += '</div>' 
        
        const blocksFromHTML = convertFromHTML(str);
        const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        );

        const {editorState, onChange} = this.props;
        const contentState = Modifier.replaceWithFragment(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            state.getBlockMap()
        );
        onChange(EditorState.push(editorState, contentState, 'insert-characters'));
        this.setState({
            isOpen: false,
            imageArr: []
        })
    }

    getUrl = (imageArr) => {
        this.setState({imageArr: imageArr})
    }
}
export default AdminSlider;