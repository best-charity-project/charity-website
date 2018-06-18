import React, { Component } from 'react';
import './AdminProjectsContent.css';
import AdminProjectsList from '../AdminProjectsList/AdminProjectsList';
import AdminProjectsSearch from '../AdminProjectsSearch/AdminProjectsSearch';
import { server } from "../../../../api";
import { Route } from 'react-router-dom';
import Button from '../../../Button/Button';

class AdminProjectsContent extends Component {
    state = {
        projects: [],
        filteredProjects: [],
        isLoading: true,
        error: null
    }
    componentDidMount(){
        fetch(`${server}/projects?isAdmin=true`,{
            method: 'GET',
            mode: 'cors'
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
            throw new Error('Something went wrong ...')
            }
        })
        .then(data => {         
              this.setState({
                projects : data.projects,
                filteredProjects:data.projects,
                isLoading: false
            })
        })
        .catch(error => this.setState({ error, isLoading: false }));
     }
     render() {
        const {isLoading, error} = this.state
        if (isLoading) {
            return <p>Loading ...</p>
        }
        if (error) {
            return <p>{error.message}</p>;
        }
        return(
            <div className="list-container">
                <div className="new-projects">
                    <AdminProjectsSearch findProjects = {this.findProjects} />
                    <div className="button-new-projects">
                        <Route render={( {history} ) => (
                            <Button 
                                name = "button-admin" 
                                label = {'Создать'} 
                                clickHandler = {() => {history.push('/admin-panel/projects/create')}} 
                            />
                        )}/>
                    </div>
                </div>
                <AdminProjectsList 
                    projects = {this.state.filteredProjects}
                    loading={this.state.isLoading}
                    deleteProject = {this.deleteProjects}
                    />
            </div>
        )
    }
    deleteProjects = (projects) => {
        let id = projects._id;
        fetch(`${ server }/projects/${ id }`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projects),
        });
            this.setState({            
                filteredProjects: this.state.filteredProjects.filter(projects => projects._id !== id)
            })  
    };

    findProjects = (name) => {
        if(!name) {
            fetch(`${server}/projects`, {
                method: 'GET', 
                mode: 'cors'
                })
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error('Something went wrong ...')
                    }
                })
                .then(data => this.setState({filteredProjects: data.projects}))
                .catch(error => this.setState({error}))
        } else {
            const {projects} = this.state
            this.setState({
                filteredProjects: projects.filter((item) => {
                    return item.name.includes(name)
                })
            })
        }
    }

}

export default AdminProjectsContent;