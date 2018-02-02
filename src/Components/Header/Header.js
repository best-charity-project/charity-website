import React from 'react';
import Navigation from '../Navigation/Navigation';
import './header.css';

class Header extends React.Component {
    render() {
        return (
            <header>
                <Navigation />
                <div className="top_img">
                    <img src={require('../img/front.jpg')}  className="header"/>    
                </div>    
            </header>
        );
    }
}

export default Header