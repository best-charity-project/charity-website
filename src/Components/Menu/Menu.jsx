import React, { Component } from 'react';
import Logo from '../Menu/Logo';
import MenuLinks from '../Menu/MenuLinks';
import SocialLinks from '../Menu/SocialLinks';

class Menu extends Component {
    render() {
        return (
            <div className={'menu ' + this.props.name}>
                <Logo client="true" />
                <MenuLinks
                    list={[
                        { name: 'о нас', url: '/' },
                        { name: 'активности', url: '/', dropdown: true },
                        { name: 'новости', url: '/news' },
                    ]}
                    onClick={this.handlerClick}
                    classActive="active-link-client"
                    className="menu-links-client"
                />
                <SocialLinks />
            </div>
        );
    }
}

export default Menu;
