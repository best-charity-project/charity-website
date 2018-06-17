import React, { Component } from 'react';
import AboutUs from "../../Components/AboutUs/AboutUs";
import Footer from "../../Components/Footer/Footer";
import Menu from "../../Components/Menu/Menu";
import "../Home/MainPage.css";
import "../Projects/Projects.css";


class Projects extends Component {
  render() {
    return (
			<div className="main-page-client">
			<Menu name = 'client-menu'/>
                <div className="projects-page-content">
                    <div className="img-container">
                        <div className="img-placeholder"></div>
                    </div>
                    <div className="project-section">
                        <div className="text-container">
                        <div className="project-date">
                            <p>Lorem ipsum dorem sit amet</p>
                        </div>
                        <div className="project-title">
                            <h2>Lorem</h2> 
                        </div>
                        <div className="project-desc">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Duis tincidunt est eu nibh dignissim tincidunt. 
                            Curabitur vitae dignissim leo, non pretium eros. 
                            Nullam risus quam, tincidunt quis rutrum non, aliquet nec tortor. 
                            Maecenas facilisis lectus libero, vel facilisis mi suscipit ac. 
                            Nulla vestibulum auctor velit, vel ornare odio. 
                            Integer nec efficitur nisi, placerat gravida tortor. 
                            Vestibulum sagittis risus in sollicitudin ornare. 
                            Quisque iaculis sapien ac ullamcorper porta. 
                            Sed vehicula nulla eget tellus rutrum iaculis. 
                            Praesent orci quam, hendrerit quis rhoncus ut, laoreet vel est. 
                            Vivamus volutpat placerat consectetur. 
                            Aliquam pretium lobortis turpis consequat convallis. 
                            Morbi dolor leo, molestie et venenatis.</p>
                        </div>
                        <button className="project-show-more-btn">читать далее</button>
                        </div>

                        <div className="projects-list-action-btns">
                            <button className="prev"></button>
                            <button className="next"></button>
                        </div>
                    </div>
                </div>
				<Footer/>
			</div>
    );
  }
}


export default Projects;