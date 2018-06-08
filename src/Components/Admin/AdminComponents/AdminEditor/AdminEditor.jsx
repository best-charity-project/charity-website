import React, { Component } from 'react';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';


class ControlledEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
        editorState: EditorState.createEmpty(),
      }
  }
  componentWillReceiveProps(nextprops){
    if(this.props.text && !nextprops.text){
      this.setState({editorState: EditorState.createEmpty()})
    }
  }
  componentDidMount (){  
      const plainText = this.props.text ;
      const content = ContentState.createFromText(plainText);
      if(content){
          this.setState({ editorState: EditorState.createWithContent(content)})
      }   
    }  

  onEditorStateChange =(editorState) => {
    this.setState({
      editorState,
    });
    const content = this.state.editorState.getCurrentContent();
    const currentText = content.getPlainText()
    this.props.getCurrentText(currentText)
  }
  
  uploadImageCallBack(file) {
    return new Promise(
        (resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://...');
            const data = new FormData();
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
            });
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
            });
        }
    );
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
            image: {previewImage: true,
                    uploadCallback: this.uploadImageCallBack}
        }}
        onEditorStateChange={this.onEditorStateChange}
      />
      </div>
    )
  }
}
export default ControlledEditor;