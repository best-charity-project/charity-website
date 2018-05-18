import React, { Component } from 'react';
import TextAboutUs from "./TextSubscribe/TextSubscribe";
import './AboutUs.css';
import mainpage from '../../../Assets/images/main.png'
class AboutUs extends Component {
  render() {
    return (
  <div className= 'AboutUs'> 
  <div className = 'main_picture'><img src ={mainpage } /></div>
  <TextAboutUs className = 'TextAboutUs'/>

  </div>
    );
  }
}

export default AboutUs;