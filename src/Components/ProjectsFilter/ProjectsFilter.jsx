import React, { Component } from 'react';

class ProjectsFilter extends Component {
    constructor() {
        super();
        this.state = {
            value: ''
        }
    }

    render() {
        return (
            <div className="project-filter">
                <label htmlFor="">Фильтры:</label>
                <select value={this.state.value} name="Фильтры" onChange={this.selectValue}>
                    {this.props.filters.map((item, i) => {
                        return <option key={i} value={item.title}>{item.title}</option>     
                    })}
                </select>
            </div>
        );
    }

    selectValue = (e) => {
        this.setState( {
            value: e.target.value
        })
        this.props.filterValue(e.target.value)
    }
}

export default ProjectsFilter;