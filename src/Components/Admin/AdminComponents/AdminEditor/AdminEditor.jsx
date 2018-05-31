import React, { Component } from 'react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';


class ControlledEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

componentDidMount (){     
const plainText = this.props.text ;
const content = ContentState.createFromText(plainText);
    this.setState({ editorState: EditorState.createWithContent(content)})
     
} 
componentWillUpdate(nextprops, nextState){
  if(nextprops.isOpen === true){
    this.setState({editorState: EditorState.createEmpty()})
    this.props.UpdateState(nextprops.isOpen )
  }
}
  onEditorStateChange =(editorState) => {
    if(this.props)
    this.setState({
      editorState,
    });
    const content = this.state.editorState.getCurrentContent();
    const currentText = content.getPlainText()
    this.props.getCurrentText(currentText)
  };

  render() {
    const  editorState  = this.state.editorState;
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