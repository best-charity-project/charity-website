import React, { Component } from 'react';

class Project extends Component {
    render() {
        return (
            <div className="projects-page-content">
                <div className="img-container">
                    <div className="img-placeholder">{this.props.content.image}</div>
                </div>
                <div className="project-section">
                    <div className="text-container">
                        <div className="project-date">{this.props.content.date}</div>
                        <div className="project-title">{this.props.content.name}</div>
                        <div className="project-desc">{this.props.content.shortText}</div>
                        <button className="project-show-more-btn">читать далее</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Project;
