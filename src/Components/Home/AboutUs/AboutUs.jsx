import React, { Component } from 'react';
import TextAboutUs from "./TextSubscribe/TextSubscribe";
import './AboutUs.css';
import mainpage from '../../../Assets/images/main.png'
class AboutUs extends Component {
  render() {
    return (
  <div className= 'about-us'> 
  <div className = 'main-picture'><img src ={mainpage } /></div>
  <TextAboutUs className = 'text-about-us'/>

  </div>
    );
  }
}

export default AboutUs;