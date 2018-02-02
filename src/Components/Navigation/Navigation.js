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
            <nav className="nav">
            <div onClick={this.toggleClass} className={this.state.active ? 'gam-bar nav-bar': 'nav-bar'}>
                <img className="img-bar" src={require('../img/NavMenu.png')} />
                <Link to="/" className="gam-nemu">Home</Link>
                <Link to="/admin" className="gam-nemu">Admin</Link>
                <Link to="/about" className="gam-nemu">About</Link>
                <Link to="/news" className="gam-nemu">News</Link>
            </div>    
                <ul className="nav-menu">
                    <li className="nav-element"><Link to="/" className="link-nemu">Home</Link></li>
                    <li className="nav-element"><Link to="/admin" className="link-nemu">Admin</Link></li>
                    <li className="nav-element"><Link to="/about" className="link-nemu">About</Link></li>
                    <li className="nav-element"><Link to="/news" className="link-nemu">News</Link></li>
                </ul>
            </nav>
        );
    }

} 
export default Navigation

