import React, { Component } from 'react';
import Logo from '../Menu/Logo';
import MenuLinks from '../Menu/MenuLinks';
import SocialLinks from '../Menu/SocialLinks';

class Menu extends Component {
  render() {
    return (
  <div className ={'menu '+ this.props.name }> 
      <Logo name = 'client-logo'/>
      <MenuLinks
       list = {[
         {name: 'о нас', url :'/'},
         {name: 'активности', url :'/'},
         {name: 'новости', url :'/news'},
         {name: 'проекты', url :'/projects'}
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