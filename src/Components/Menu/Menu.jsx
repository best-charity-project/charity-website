import React, { Component } from 'react';
import Logo from '../Menu/Logo';
import MenuLinks from '../Menu/MenuLinks';
import SocialLinks from '../Menu/SocialLinks';

class Menu extends Component {
  render() {
    return (
  <div className ={'menu '+ this.props.name }> 
      <Logo/>
      <MenuLinks
       list = {[
         {name: 'о нас', url :'/'},
         {name: 'новости', url :'/news'},
         {name: 'проекты', url :'/news'}
         ]} 
       onClick = {this.handlerClick}
       classActive = 'active-link-client'
       className = 'menu-links-client'/>
       <SocialLinks />
  </div>
    );
  }
}

export default Menu;