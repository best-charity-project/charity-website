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
            isFirstProject: true
        };
        this.nextProject = this.nextProject.bind(this);
        this.previousProject = this.previousProject.bind(this);
    }

    componentDidMount() {
        axios.get(`${server}/projects`).then(res => {
            this.setState({
                currentDisplayedProject: res.data.projects[0],
                projects: res.data.projects,
                isLastProject: res.data.projects.length === 1 ? true : false    
            });
        });
        this.getFiltersList();
    }

    getFiltersList = () => {  
        axios({
            method: 'get',
            url: `${ server }/filters`,
        })
        .then(res =>{
            let filterList = res.data.filterList;
            let filtersProjects = _.filter(filterList , function(el){
                if(el.type === 'projects'){
                    return el
                }
            })
            this.setState({
                filters:filtersProjects,
            })
        })
    }

    render() {
        return (
            <div className="main-page-client"> 
                <Menu name="client-menu" />
                {this.state.currentDisplayedProject.name ? <Project content={this.state.currentDisplayedProject}/> : null}
                {this.state.filters ? <ProjectsFilter filterValue={this.filterValue} filters={this.state.filters}/> : null}
                <div className="projects-list-action-btns">
                    <SliderPreviousBtn disabled={this.state.isFirstProject} previousProject={this.previousProject} />
                    <SliderNextBtn disabled={this.state.isLastProject} nextProject={this.nextProject} />
                </div>
                <Footer />
            </div>
        );
    }

    previousProject() {
        let displayedProjectIndex = _.findIndex(this.state.projects, this.state.currentDisplayedProject);
        this.setState({
            currentDisplayedProject: this.state.projects[displayedProjectIndex - 1],
            isFirstProject: displayedProjectIndex - 1 === 0,
            isLastProject: false,
        });
    }

    nextProject() {
        let displayedProjectIndex = _.findIndex(this.state.projects, this.state.currentDisplayedProject);
        this.setState({
            currentDisplayedProject: this.state.projects[displayedProjectIndex + 1],
            isLastProject: this.state.projects.length - 1 === displayedProjectIndex + 1,
            isFirstProject: false,
        });
    }

    filterValue = (str) => {
        this.setState ({
            filterValue: str
        })
        let test = this.state.projects.filter(project => project.filter === this.state.filterValue)
        console.log(test)
    }
}

export default Projects;
