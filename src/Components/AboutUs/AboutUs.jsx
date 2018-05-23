import React, { Component } from 'react';
import TextAndForm from "../TextAndFormMainPage/TextAndForm";
import "../AboutUs/AboutUs.css";
import mainpage from "../../Assets/images/svg/main.png";

class AboutUs extends Component {
    render () {
        return (
            <div className= "about-us">
                <div className = "main-picture"><img src ={mainpage} alt = "main-page" /></div>
                <TextAndForm />
            </div>
        );
    }
}

export default AboutUs;
