import React, {Component} from 'react';
import {Editor} from 'react-draft-wysiwyg'; 
import {EditorState, convertToRaw} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';

import {server} from '../../../../api';
import AdminSlider from './AdminSlider';
import customBlockRenderFunc from './Renderer';
import './AdminEditor.css';

class ControlledEditor extends Component {
    state = {
        editorState: EditorState.createEmpty(),
    }
    setEditorReference = (ref) => {
        this.currentEditor = ref
    }

    componentDidMount() {
        // console.log('AdminEditor.componenDidMount', convertToRaw(this.props.initialEditorState.getCurrentContent()))
        this.props.initialEditorState ? 
            this.setState({editorState: this.props.initialEditorState}) :
            this.setState({editorState: EditorState.createEmpty()}) 
    }
    
    render() {
        return (
            <div>
                <Editor
                    editorRef = {this.setEditorReference}
					editorState={this.state.editorState}
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
                    onEditorStateChange={this.onChange}
                    customBlockRenderFunc={this.customBlockRenderFuncWrap}
                />
            </div>
        )
    } 
    onChange = (editorState) => {
        // console.log('AdminEditor.onChange', convertToRaw(editorState.getCurrentContent()))
        this.setState({editorState: editorState})
        this.props.onEditorStateChange(editorState)
    }

    customBlockRenderFuncWrap = (block) => {
        return customBlockRenderFunc(block, this.onChange, this.currentEditor, true)
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
}
export default ControlledEditor;