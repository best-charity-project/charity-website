import React, { Component } from 'react';

import AboutUs from "./AboutUs/AboutUs";
import Footer from "./Footer/Footer";
import Menu from "../../Components/menu/Menu";
import './MainPage.css'
class Home extends Component {
  render() {
    return (
		<div className="main">
		<Menu/>
			<AboutUs/>
			<Footer/>
		</div>
    );
  }
}

export default Home;