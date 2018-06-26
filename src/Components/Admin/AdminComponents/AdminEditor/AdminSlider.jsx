import React, {Component} from 'react';
import {ContentState, convertToRaw, EditorState, Modifier} from 'draft-js';
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
            <div className = 'rdw-option-wrapper' aria-selected = 'false' title = 'Слайдер' onClick = {this.openModalWindow}>
                <img src = {slider} alt = '' />
                <div className = {this.state.isOpen ? 'overlay' : 'overlay hidden'} onClick = {this.closeModalWindow}>
                    <div className="modal-element">
                        <ModalWindow 
                            getUrl = {this.getUrl}
                            addSlider = {this.addSlider}
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
            this.setState({isOpen: false})
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
        /* let parser = new DOMParser()
        str = parser.parseFromString(str, "text/xml")
        console.log(str) */

        const {editorState, onChange} = this.props;
        const contentState = Modifier.replaceText(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            str,
            editorState.getCurrentInlineStyle(),
        );
        onChange(EditorState.push(editorState, contentState, 'insert-characters'));
        this.setState({isOpen: false})
    }

    getUrl = (imageArr) => {
        this.setState({imageArr: imageArr})
    }
}
export default AdminSlider;