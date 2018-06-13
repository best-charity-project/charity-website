import React, { Component } from 'react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {server} from '../../../../api';
import './AdminEditor.css';

class ControlledEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        }
    }
    componentWillReceiveProps(nextprops) {
        if (this.props.text && !nextprops.text) {
            this.setState({ editorState: EditorState.createEmpty() })
        }
    }
    componentDidMount() {
        const plainText = this.props.text;
        const content = ContentState.createFromText(plainText);
        if (content) {
            this.setState({ editorState: EditorState.createWithContent(content) })
        }
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
        const content = this.state.editorState.getCurrentContent();
        const currentText = content.getPlainText()
        this.props.getCurrentText(currentText)
    }

    uploadImageCallBack = (file) => {
        let formData  = new FormData();
        formData.append('image', file);

        fetch(`${server}/images`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: formData
        })
        .then(response => console.log(response)/* response.json() */)
    }

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    wrapperClassName="wrapper"
                    toolbarClassName="toolbar"
                    editorClassName="editor"
                    localization={{
                        locale: 'ru'
                    }}
                    toolbar={{
                        image: {
                            previewImage: true,
                            uploadCallback: this.uploadImageCallBack
                        }
                    }}
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>
        )
    }
}
export default ControlledEditor;