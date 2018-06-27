import React, { Component } from 'react';
import moment from 'moment';
import ReactPlayer from 'react-player';
import Organization from "../../Assets/AssetsSvg/organization.svg"; 
import Person from "../../Assets/AssetsSvg/person.svg";
import Phone from "../../Assets/AssetsSvg/phone.svg";


class Project extends Component {
    constructor() {
        super();
        this.state = {
            isFullText: false,
            fullTextView: false,
            buttonIsClicked: false
        }
    }

    componentWillReceiveProps() {
        this.setState({
            isFullText: false,
            fullTextView: false,
            buttonIsClicked: false
        })
    }
    
    render() {
        return (
            <div className="projects-page-content">
                <div className="img-container">
                    <div className="img-placeholder">
                        <img src={`http://localhost:3001/images/${this.props.content.image}`} />
                    </div>
                </div>
                <div className="project-section">
                    <div>
                        <div className="text-container">
                            <div className="project-title"><h3>{this.props.content.name}</h3></div>
                            <div className="project-address">{this.props.content.address}</div>
                            <div className="project-desc">
                                <span dangerouslySetInnerHTML= {{__html: this.props.content.fullText}}></span>
                            </div>
                            {this.state.fullTextView && this.props.content.video != "" ? 
                                <div className="player-wrapper">
                                    <ReactPlayer  url={this.props.content.video} 
                                              playing 
                                              controls 
                                              className="react-player" 
                                              width='100%' 
                                              height='100%'/>
                                </div> : null }
                        </div>
                        {this.state.fullTextView ? 
                            <div>
                            <div className="project-gallery">
                                <div className="gallery-item"></div>
                                <div className="gallery-item"></div>
                                <div className="gallery-item">VIDEO</div>
                                <div className="gallery-item"></div>
                            </div>
                            <div className="contact-info">
                                <p>Контактная информация</p>
                                <hr/>
                                <span>{this.props.content.organization}</span><br/>
                                <span>{this.props.content.head}</span><br/>
                                <span>{this.props.content.contacts}</span><br/>
                            </div>
                            </div> : null }
                    </div>
                    <div className="show-more-container">
                        <button 
                            onClick = {() => this.setState({ 
                                isFullText: !this.state.isFullText, 
                                fullTextView: !this.state.fullTextView, 
                                buttonIsClicked: !this.state.buttonIsClicked
                                })
                            } className="project-show-more-btn">{!this.state.buttonIsClicked ? "читать далее" : "Менее"}</button>
                    </div>        
                </div>
            </div>
        );
    }
}

export default Project;
