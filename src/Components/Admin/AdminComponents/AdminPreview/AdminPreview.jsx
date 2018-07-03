import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import moment from 'moment';
import axios from 'axios';
import {Editor} from 'draft-js';
import blockRendererFn from '../AdminEditor/Renderer'
import customRendererFn from '../AdminEditor/Renderer'

import Button from '../../../Button/Button';
import {server} from '../../../../api';
import './AdminPreview.css';

class AdminPreview extends Component {
    render() {
        return (
            <div className = 'admin-preview'>
                <div className = 'full-news-list-container'>
                    <div className = 'full-news'>
                        <div><img src = {this.props.imageData ? 
                            this.props.imageData : 
                                this.props.image ?
                                'http://localhost:3001/images/' + this.props.image :
                                null} alt = "" />
                        </div> 
                        <p className = 'full-news-date'>
                            {this.props.date ? 
                                moment(this.props.date).format('DD MMMM YYYY') : 
                                moment().format('DD MMMM YYYY')} 
                        </p>
                        <p className = 'full-news-title'> {this.props.title}</p>               
                        {/* <span dangerouslySetInnerHTML={{__html: this.props.fullText}}/> */}
                        <Editor 
                            editorState={this.props.fullTextEditorState} 
                            readOnly={true} 
                            blockRendererFn={customRendererFn}
                        />
                    </div>
                    <div className = 'status-info'>
                        <span>Статус новости: {this.props.isPublic ? " опубликована" : " черновик"}</span>
                    </div>
                    <div className="admin-buttons">
                        <Route render={({history}) => (
                            <Button 
                                label={this.props.isPublic ? "Отменить публикацию" : "Опубликовать"}
                                name = "button-admin"
                                clickHandler = {this.props.onSaveChangeStatus}
                            />
                        )} />
                        <Route render={({history}) => (
                            <Button 
                                label={this.props.isPublic ? "Сохранить" : "Сохранить без публикации"}
                                name = "button-admin"
                                clickHandler = {this.props.onSaveStatus}
                            />
                        )} />
                        <Route render={({history}) => (
                            <Button 
                                label={"Отмена"}
                                name = "button-admin"
                                clickHandler = {this.onCancelPreview}
                            />
                        )} />
                    </div>
                </div>
            </div>
        )
    }
    onCancelPreview = (e) => {
        e.preventDefault()
        this.props.getNewStatePreview()
    }
}

export default withRouter(AdminPreview);