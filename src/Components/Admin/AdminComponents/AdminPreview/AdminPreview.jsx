import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import moment from 'moment';
import axios from 'axios';

import Button from '../../../Button/Button';
import {server} from '../../../../api';
import './AdminPreview.css';

class AdminAddNews extends Component {

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
                        </div > 
                        <p className = 'full-news-date'>{moment().format('DD MMMM YYYY')} </p>
                        <p className = 'full-news-title'> {this.props.title}</p>               
                        <span dangerouslySetInnerHTML={{__html: this.props.fullText}}/>
                       {/*  <span>{this.props.fullText}</span> */}
                    </div>
                    <div className = 'button-info'>
                        <span>* При нажатии на кнопку "Сохранить" новость сохраняется как черновик</span>
                    </div>
                    <div className="admin-buttons">
                        <Route render={({history}) => (
                            <Button 
                                label={"Опубликовать"}
                                name = "button-admin"
                                clickHandler = {this.props.onPublish}
                            />
                        )} />
                        <Route render={({history}) => (
                            <Button 
                                label={"Сохранить"}
                                name = "button-admin"
                                clickHandler = {this.props.onDraft}
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

export default withRouter(AdminAddNews);