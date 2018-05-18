import React, { Component } from 'react';
import Logo from './logo'
import MainList from './mainList'
import MediaList from './mediaList'
class Menu extends Component {

  render() {
  	
    return (
  <div className = 'menu'> 
      <Logo/>
      <MainList list = {[{name: 'о нас', url :'/'},{name: 'новости', url :'/news'}]}/>
       <MediaList/>
  </div>
    );
  }
}

export default Menu;