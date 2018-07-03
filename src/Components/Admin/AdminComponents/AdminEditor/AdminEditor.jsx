import React, {Component} from 'react';
import {Editor} from 'react-draft-wysiwyg'; 
import {ContentState, EditorState} from 'draft-js';
/* import {convertToHTML, convertFromHTML, Middleware} from 'draft-convert'; */
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {server} from '../../../../api';
import axios from 'axios';
import AdminSlider from './AdminSlider';
import customBlockRenderFunc from './Renderer';
import './AdminEditor.css';

class ControlledEditor extends Component {
    state = {
        editorState: EditorState.createEmpty(),
    }
    
    componentDidMount() {
        this.props.initialEditorState ? 
            this.setState({editorState: this.props.initialEditorState}) :
            this.setState({editorState: EditorState.createEmpty()}) 
    }
    
    onChange = (editorState) => {
        /* const currentContentState = this.state.editorState.getCurrentContent()
        const newContentState = editorState.getCurrentContent()
        const currentInlineStyle = this.state.editorState.getCurrentInlineStyle()
        const newInlineStyle = editorState.getCurrentInlineStyle() */
        /* if (currentContentState !== newContentState || currentInlineStyle !== newInlineStyle) { */
        this.props.onEditorStateChange(editorState)
        this.setState({editorState: editorState})
        /* } */
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
        return (
            <div>
                <Editor
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
                    customBlockRenderFunc={customBlockRenderFunc}
                />
            </div>
        )
    } 
}
export default ControlledEditor;