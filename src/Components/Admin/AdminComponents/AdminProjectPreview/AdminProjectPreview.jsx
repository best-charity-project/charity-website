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
                                <div className="project-title">
                                    <h3>{this.props.name}</h3>
                                </div>
                                <div className="project-address">{this.props.address}</div>
                                <div className="project-desc">
                                    <span dangerouslySetInnerHTML= {{__html: this.props.fullText}}></span>
                                </div>
                            </div>
                            <div className="contact-info">
                                <p>Контакты:</p>
                                <p>{this.props.organization}</p>
                                {console.log(this.props.headArray)}
                                {console.log(this.props.contactsArray)}
                                {console.log(this.props.name)}
                                {/* {this.props.headArray.map( (link,index) => 
                                        <div key={index}>{link}</div>
                                )}, 
                               {this.props.contactsArray.map( (link,index) =>
                                        <div key={index}><p>{link}</p></div>
                                )} */}
                                <p>{this.props.site}</p>
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