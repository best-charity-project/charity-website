import React, { Component } from 'react';
import { server } from "../../api";
import axios from "axios";
import Project from "../Project/Project";
import SliderPreviousBtn from "../Slider/SliderButtons/SliderPreviousBtn";
import SliderNextBtn from "../Slider/SliderButtons/SliderNextBtn";

class ProjectData extends Component {
    constructor() {
        super();
        this.state = {
            projects: []
        }
    }

    componentDidMount() {
        axios.get(`${server}/projects`)
          .then(res => {
            const projects = res.data;
            this.setState({ projects });
          })
      }
        

    render() {
        return(
            <div>
                {(this.props.projects) ? this.state.projects.map(projects => 
                    <Project    date = {projects.date}
                                name = {projects.name}
                                image = {projects.image}
                                shortText = {projects.shortText}
                                fullText = {projects.fullText} 
                                slideIndex = {this.state.slideCount} />) : null}   
            </div>
        )
    }

}

export default ProjectData;