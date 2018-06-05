import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import '../Menu/Menu.css';
import eventsImg from '../../Assets/AssetsSvg/event.svg';
import projectsImg from '../../Assets/AssetsSvg/idea.svg';

class DropMenu extends Component {
	constructor(props){
		super(props);
	}
  render() {
    return (
		<div className = {this.props.name}> 
            <div className = 'drop-menu-events'>
                <div className = 'drop-menu-events-wrapper'>
                <NavLink to = '/events'>
                <img src = {eventsImg}/>
                    <p> События</p> 
                    </NavLink>
                </div>
            </div>  
            <div className = 'drop-menu-projects'>
            <div className = 'drop-menu-projects-wrapper'>
            <NavLink to = '/'>
            <img src = {projectsImg}/>
                <p> Проекты</p> 
                </NavLink>
                </div>
            
            </div>  
		</div>
  	
    );
  }
}

export default DropMenu;