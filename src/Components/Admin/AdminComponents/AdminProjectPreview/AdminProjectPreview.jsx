import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

import Button from '../../../Button/Button';
import {server} from '../../../../api';
import './AdminProjectPreview.css';
import '../../../../Pages/Projects/Projects.css'

class AdminProjectPreview extends Component {

    render() {
        return (
            <div className = 'admin-preview'>
                <div className="projects-page-content">
                    <div className="image-container">
                        <div className="img-placeholder">
                            <img  src = {this.props.imageData ? 
                                this.props.imageData : 
                                    this.props.image ?
                                    `http://localhost:3001/images/${this.props.image}` :
                                null} alt = "" />
                        </div > 
                    </div>
                        <div className="project-section">
                        <div className="full-text-card">
                            <div className="text-container">
                                <div className="project-date">
                                    <p className = 'full-projects-date'>{moment(this.props.date).format('Do MMMM YYYY')} </p>
                                </div>
                        <div className="project-title"> {this.props.name}</div>   
                        <span dangerouslySetInnerHTML={{__html: this.props.fullText}}/>
                        </div>
                        </div>
                    </div>
                </div>
                <hr/>
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
            
        )
    }
    
    onCancelPreview = (e) => {
        e.preventDefault()
        this.props.getNewStatePreview()
    }
}

export default withRouter(AdminProjectPreview);