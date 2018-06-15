import React, { Component } from 'react';
import { server } from "../../api";
import ProjectData from "../Project/ProjectData";


class Project extends Component {

    render() {
        return (
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
            </div> 
        )
    }
}

export default Project;