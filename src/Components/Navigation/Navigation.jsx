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
            const currentState = this.state.active;
            this.setState({ active: !currentState });
    };

    render() {
        const navigationClassNames = classnames('navigation--menu-image', {'navigation--menu-open' : this.state.active});
        return (
            <nav className="navigation">
                <div className='navigation--menu' onClick={this.toggleClass}>
                        <img className={navigationClassNames} src={require('../img/NavMenu.svg')}/>
                        <Link to="/" className="navigation--menu-element">Home</Link>
                        <Link to="/admin" className="navigation--menu-element">Admin</Link>
                        <Link to="/about" className="navigation--menu-element">About</Link> 
                        <Link to="/news" className="navigation--menu-element">News</Link>
                </div>    
            </nav>
        );
    }
} 

export default Navigation