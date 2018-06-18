import React, { Component } from 'react';
import moment from 'moment';

class Project extends Component {
    render() {
        return (
            <div className="projects-page-content">
                <div className="img-container">
                    <div className="img-placeholder">
                        <img src={`http://localhost:3001/images/${this.props.content.image}`} />
                    </div>
                </div>
                <div className="project-section">
                    <div className="text-container">
                        <div className="project-date">
                            {moment(this.props.content.date).format('Do MMMM YYYY, h:mm')}
                        </div>
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
