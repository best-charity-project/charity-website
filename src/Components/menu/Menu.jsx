import React, { Component } from 'react';
import Logo from './logo'
import MainList from './mainList'
import MediaList from './mediaList'
class Menu extends Component {
  render() {
  	
    return (
  <div className = 'menu'> 
      <Logo/>
      <MainList list = {['О НАС',"ПРОЕКТЫ"]}/>
       <MediaList/>
  </div>
    );
  }
}

export default Menu;