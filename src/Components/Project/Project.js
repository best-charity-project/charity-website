import React, { Component } from 'react';

class Project extends Component {

    render() {
        return (
            <div>
                {(this.props.projects) ? this.state.projects.map(projects => 
                    <div className="projects-page-content">
                        <div className="img-container">
                            <div className="img-placeholder"></div>
                        </div>
                        <div className="project-section">
                            <div className="text-container">
                                <div className="project-date"></div>
                                <div className="project-title"></div>
                                <div className="project-desc"></div>
                                <button className="project-show-more-btn">читать далее</button>
                            </div>
                        </div>
                    </div> ) : null}   
            </div>
        )
    }
}

export default Project;