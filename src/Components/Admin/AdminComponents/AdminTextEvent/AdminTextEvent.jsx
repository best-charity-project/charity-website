import React, {Component} from 'react';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './AdminTextEvent.css';


class AdminTextEvent extends Component {
    render() {
        return (
            <div>
                <Editor
                    wrapperClassName="wrapper"
                    toolbarClassName="toolbar"
                    editorClassName="editor"
                    localization={{
                        locale: 'ru',
                    }}
                    toolbar={{
                        image: {previewImage: true,
                                uploadCallback: this.uploadImageCallBack}
                    }}
                />
            </div>
        );
    }
    uploadImageCallBack(file) {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://...');
                xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
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
}

export default AdminTextEvent;
