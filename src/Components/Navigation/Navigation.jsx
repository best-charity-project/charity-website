import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import classnames from 'classnames'; 


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
        const navigationClassNames = classnames('img-bar', {'gam-bar' : this.state.active});
        return (
            <nav className="navigation">
                <div className='navigation-bar'>
                        <img className={navigationClassNames} onClick={this.toggleClass} src={require('../img/NavMenu.svg')}/>
                        <Link to="/" className="ham-menu">Home</Link>
                        <Link to="/admin" className="ham-menu">Admin</Link>
                        <Link to="/about" className="ham-menu">About</Link> 
                        <Link to="/news" className="ham-menu">News</Link>
                </div>    
            </nav>
        );
    }
} 
export default Navigation
