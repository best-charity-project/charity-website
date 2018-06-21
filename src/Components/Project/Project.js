import React, { Component } from 'react';
import moment from 'moment';

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
                    <div className={this.state.fullTextView ? "full-text-card" : ""}>
                        <div className="text-container">
                            <div className="project-date">
                                {moment(this.props.content.date).format('Do MMMM YYYY')}
                            </div>
                            <div className="project-title">{this.props.content.name}</div>
                            <div className="project-desc">
                                <span dangerouslySetInnerHTML= {{__html: !this.state.isFullText ? this.props.content.shortText : this.props.content.fullText}}></span>
                            </div>
                        </div>
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
