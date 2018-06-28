import React, {Component} from 'react';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {ContentState, convertToRaw, convertFromHTML} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {server} from '../../../../api';
import axios from 'axios';
import AdminSlider from './AdminSlider';
import './AdminEditor.css';

class ControlledEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorContent: ''
        }
    }
    
    componentDidMount() {
        this.props.text ? 
            this.setState({ editorContent: this.getInitialHTML(this.props.text)}) :
            this.setState({ editorContent: '' }) 
    }
    
    getInitialHTML = (str) => {
        const contentBlock = htmlToDraft(str);
        if (contentBlock.contentBlocks !== null) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks, contentBlock.entityMap);
            return convertToRaw(contentState);
        }
    }
    onEditorChange =(contentState) => {
        let text = draftToHtml(contentState)
        this.props.getCurrentText(text)
    }

    uploadImageCallBack = (file) => {
        let formData  = new FormData();
        formData.append('image', file);
        return axios({
            method: 'post',
            url: `${server}/uploadImages/`,
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data; charset=UTF-8'}},
        })
    }

    render() {
        const { editorContent } = this.state;
        return (
            <div>
                <Editor
					contentState={editorContent}
                    wrapperClassName="wrapper"
                    toolbarClassName="toolbar"
                    editorClassName="editor"
                    toolbarCustomButtons={[<AdminSlider />]}
                    localization={{
                        locale: 'ru'
                    }}
                    toolbar={{
                        image: {
                            previewImage: true,
                            uploadCallback: this.uploadImageCallBack,
                            defaultSize: {
                                height: 'auto',
                                width: '100%',
                            },
						},
						blockType: {
							inDropdown: true,
							options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
						}
                    }}
                    onChange={this.onEditorChange}
                />
            </div>
        )
    } 
}
export default ControlledEditor;