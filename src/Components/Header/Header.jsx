import React from 'react';
import Navigation from '../Navigation/Navigation';
import './header.css';

class Header extends React.Component {
    render() {
        return (
            <header className="Header">
                <Navigation />
            </header>
        );
    }
}

export default Header