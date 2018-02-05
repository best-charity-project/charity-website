import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';


class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.toggleClass= this.toggleClass.bind(this);
        this.state = {
            active: false
        };
    }
    toggleClass() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    };
    render() {
        return (
            <nav className="nav Navigation">
            <div onClick={this.toggleClass} className={this.state.active ? 'gam-bar nav-bar': 'nav-bar'}>
                <img className="img-bar" src={require('../img/NavMenu.png')} />
                <Link to="/" className="ham-menu">Home</Link>
                <Link to="/admin" className="ham-menu">Admin</Link>
                <Link to="/about" className="ham-menu">About</Link>
                <Link to="/news" className="ham-menu">News</Link> 
            </div>    
            <div className="nav-menu">
                <Link to="/" className="nav-element">Home</Link>
                <Link to="/admin" className="nav-element">Admin</Link>
                <Link to="/about" className="nav-element">About</Link>
                <Link to="/news" className="nav-element">News</Link>
            </div>  
            </nav>
        );
    }

} 
export default Navigation

