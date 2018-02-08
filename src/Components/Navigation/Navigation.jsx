import React from 'react';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
    render() {
        return (
            <nav className="Navigation">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/admin">Admin</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/news">News</Link></li>
                </ul>
            </nav>
        );
    }
}

export default Navigation
