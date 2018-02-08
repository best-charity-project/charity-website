import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import "./Navigation.css";

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.toggleClass= this.toggleClass.bind(this);
        this.state = {
            active: false
        };
    }
    toggleClass() {
        var body_style = window.getComputedStyle(document.body);
        var body_width = parseInt(body_style.width, 10);
        if (body_width < 500){
            const currentState = this.state.active;
            this.setState({ active: !currentState });
        } 
    };

    render() {
        const navigationClassNames = classnames('navigation--menu-image_close', {'navigation--menu-image_open' : this.state.active});
        return (
            <nav className="navigation">
                <div className='navigation--menu' onClick={this.toggleClass}>
                        <img className={navigationClassNames} src={require('../img/NavMenu.svg')}/>
                        <Link to="/" className="navigation--menu-element_style">Home</Link>
                        <Link to="/admin" className="navigation--menu-element_style">Admin</Link>
                        <Link to="/about" className="navigation--menu-element_style">About</Link> 
                        <Link to="/news" className="navigation--menu-element_style">News</Link>
                </div>    
            </nav>
        );
    }
} 

export default Navigation