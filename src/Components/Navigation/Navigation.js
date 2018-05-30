import React , { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import logo from "../../Assets/AssetsSvg/on-info-logo.svg"
import "./Navigation.css";
import Button from "../Button/Button"
import { removeToken } from "../Admin/Auth/"


class Navigation extends Component{
    constructor(props) {
        super(props);
       
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        removeToken()
            this.props.history.push('/admin-panel');
    }
    
    render(){
        return (
            <div className="container-min">
                <img src={logo} className="main-logo"/>
                <Button label="Выйти" name="button-admin-exit" clickHandler={this.handleLogout}/>
            </div>            
        )
     }
}
export default withRouter(Navigation);