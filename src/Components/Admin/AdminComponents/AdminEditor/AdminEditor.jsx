import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';


class ControlledEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange =(editorState) => {
    this.setState({
      editorState,
    });
    const content = this.state.editorState.getCurrentContent();
    const currentText = content.getPlainText()
    this.props.getCurrentText(currentText)
  };

  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        wrapperClassName="wrapper"
        toolbarClassName="toolbar"
        editorClassName="editor"
        localization={{
            locale: 'ru'
        }}
        toolbar={{
            image: {previewImage: true,
                    uploadCallback: this.uploadImageCallBack}
        }}
        onEditorStateChange={this.onEditorStateChange}
      />
    )
  }
}
export default ControlledEditor;