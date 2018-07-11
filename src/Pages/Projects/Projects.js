import React, { Component } from 'react';
import { server } from '../../api';
import axios from 'axios';
import _ from 'lodash';
import Footer from '../../Components/Footer/Footer';
import Menu from '../../Components/Menu/Menu';
import '../Home/MainPage.css';
import '../Projects/Projects.css';
import Project from '../../Components/Project/Project';
import SliderPreviousBtn from '../../Components/Slider/SliderButtons/SliderPreviousBtn';
import SliderNextBtn from '../../Components/Slider/SliderButtons/SliderNextBtn';
import ProjectsFilter from '../../Components/ProjectsFilter/ProjectsFilter';

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDisplayedProject: {},
            currentProjectIndex: 0,
            projects: [],
            filteredProjects: [],
            filterValue: 'все',
            filters: [],
            isLastProject: false,
            isFirstProject: true,
        };
        this.nextProject = this.nextProject.bind(this);
        this.previousProject = this.previousProject.bind(this);
    }

    componentDidMount() {
        axios.get(`${server}/projects`).then(res => {
            this.setState({
                currentDisplayedProject: res.data.projects[0],
                projects: res.data.projects,
                filteredProjects: res.data.projects,
                isLastProject: false,
            });
        });
        this.getFiltersList();
    }

    getFiltersList = () => {
        axios({
            method: 'get',
            url: `${server}/filters`,
        }).then(res => {
            let filterList = res.data.filterList;
            let filtersProjects = _.filter(filterList, function(el) {
                if (el.type === 'projects') {
                    return el;
                }
            });
            this.setState({
                filters: filtersProjects,
            });
        });
    };

    render() {
        return (
            <div className="main-page-client">
                <Menu name="client-menu" />
                {this.state.currentDisplayedProject.name ? (
                    <Project content={this.state.currentDisplayedProject} />
                ) : (
                    <p>нихера</p>
                )}
                {this.state.filters ? (
                    <ProjectsFilter filterProjects={this.filterProjects} filters={this.state.filters} />
                ) : null}
                <div className="projects-list-action-btns">
                    <SliderPreviousBtn disabled={this.state.isFirstProject} previousProject={this.previousProject} />
                    <SliderNextBtn disabled={this.state.isLastProject} nextProject={this.nextProject} />
                </div>
                <Footer />
            </div>
        );
    }

    previousProject() {
        let displayedProjectIndex = _.findIndex(this.state.filteredProjects, this.state.currentDisplayedProject);
        this.setState({
            currentDisplayedProject: this.state.filteredProjects[displayedProjectIndex - 1],
            isFirstProject: displayedProjectIndex - 1 === 0,
            isLastProject: false,
        });
    }

    nextProject() {
        let displayedProjectIndex = _.findIndex(this.state.filteredProjects, this.state.currentDisplayedProject);
        this.setState({
            currentDisplayedProject: this.state.filteredProjects[displayedProjectIndex + 1],
            isLastProject: this.state.filteredProjects.length - 1 === displayedProjectIndex + 1,
            isFirstProject: false,
        });
    }

    checkIsProjectSingle() {}

    filterProjects = value => {
        if (value === 'все') {
            this.setState({
                filteredProjects: this.state.projects,
                currentDisplayedProject: this.state.projects[0],
            });
        } else {
            let filteredProjectsList = this.state.projects.filter(projects => {
                return projects.filter === value;
            });
            this.setState({
                currentDisplayedProject: filteredProjectsList[0],
                filteredProjects: filteredProjectsList,
            });
        }
        if (this.state.filteredProjects.length === 1) {
            this.setState({ isLastProject: true, isFirstProject: true });
        }
    
        console.log(this.state.filteredProjects)
    };
}

export default Projects;
