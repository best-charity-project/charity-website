import React, { Component } from 'react';
import Logo from '../Menu/Logo';
import MenuLinks from '../Menu/MenuLinks';
import SocialLinks from '../Menu/SocialLinks';
import '../Menu/Menu.css';

class Menu extends Component {
    render() {
        return (
            <div className ={this.props.name} > 
                <Logo/>
                <MenuLinks
                    list = {[{name: 'о нас', url :'/'},{name: 'новости', url :'/news'}]} 
                    onClick = {this.handlerClick}
                    classActive = "active-link-client"
                    name = "menu-links-client"/>
                <SocialLinks />
            </div>
        );
    }
}

export default Menu;