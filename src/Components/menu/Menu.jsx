import React, { Component } from 'react';
import Logo from './logo'
import MainList from './mainList'
import MediaList from './mediaList'
class Menu extends Component {
  render() {
    return (
  <div className ={'menu '+ this.props.name }> 
      <Logo/>
      <MainList list = {[
        {name: 'о нас', url :'/'},
        {name: 'новости', url :'/news'}]} 
        onClick = {this.handlerClick}
        classActive = 'active-link-client'
        className = 'menu-list-client'/>
       <MediaList/>
  </div>
    );
  }
}

export default Menu;