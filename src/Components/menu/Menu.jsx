import React, { Component } from 'react';
import Logo from './logo'
import MainList from './mainList'
import MediaList from './mediaList'
class Menu extends Component {
  render() {
  	const list = ['О НАС',"ПРОЕКТЫ"]
    return (
  <div className = 'menu'> 
      <Logo/>
      <MainList list = {list}/>
       <MediaList/>
  </div>
    );
  }
}

export default Menu;