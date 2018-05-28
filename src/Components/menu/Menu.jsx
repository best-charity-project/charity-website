import React, { Component } from 'react';
import Logo from '../menu/Logo';
import MenuLinks from '../menu/MenuLinks';
import SocialLinks from '../menu/SocialLinks';

class Menu extends Component {
  render() {
    return (
  <div className ={'menu '+ this.props.name }> 
      <Logo/>
      <MenuLinks
       list = {[{name: 'о нас', url :'/'},{name: 'новости', url :'/news'}]} 
       onClick = {this.handlerClick}
       classActive = 'active-link-client'
       className = 'menu-links-client'/>
       <SocialLinks />
  </div>
    );
  }
}

export default Menu;