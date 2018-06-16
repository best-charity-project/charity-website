import React, { Component } from 'react';
import AboutUs from "../../Components/AboutUs/AboutUs";
import Footer from "../../Components/Footer/Footer";
import Menu from "../../Components/Menu/Menu";
import "../Home/MainPage.css";
import "../Projects/Projects.css";
import "../../Components/Project/Project";


class Projects extends Component {
  render() {
    return (
			<div className="main-page-client">
                <Menu name = 'client-menu'/>
                <Project/>    
                <Footer/>
			</div>
    );
  }
}

export default Projects;