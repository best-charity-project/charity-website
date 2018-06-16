import React, { Component } from 'react';
import { server } from "../../api";
import axios from "axios";
import AboutUs from "../../Components/AboutUs/AboutUs";
import Footer from "../../Components/Footer/Footer";
import Menu from "../../Components/Menu/Menu";
import "../Home/MainPage.css";
import "../Projects/Projects.css";
import Project from "../../Components/Project/Project";
import SliderPreviousBtn from "../../Components/Slider/SliderButtons/SliderPreviousBtn";
import SliderNextBtn from "../../Components/Slider/SliderButtons/SliderNextBtn"


class Projects extends Component {
    constructor() {
        super();
        this.state = {
            currentDisplayedProject: 0,
            projects: []
        }

        this.nextProject = this.nextProject.bind(this);
        this.previousProject = this.previousProject.bind(this);
    }
    
    componentDidMount() {
            axios.get(`${server}/projects`)
              .then(res => {
                const projects = res.data;
                this.setState({ projects });
                console.log(res.projects)
            })

        this.setState({
            currentDisplayedProject: 0  
        })
    }

    render() {
        return (
			<div className="main-page-client">
                <Menu name = 'client-menu'/>
                <Project/>
                <div className="projects-list-action-btns">
                    <SliderPreviousBtn previousProject={this.previousProject}/>
                    <SliderNextBtn nextProject={this.nextProject}/>          
                </div>
                <Footer/>
			</div>
        );
    }

    previousProject() {
        this.setState({ slideCount: this.slideCount - 1 })
    }

    nextProject() {
        this.setState({ slideCount: this.state.slideCount + 1 })
    }
}

export default Projects;