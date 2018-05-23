import React , { Component } from "react";
import { NavLink } from "react-router-dom";

import logo from "../../Assets/AssetsSvg/on-info-logo.svg"
import "./Navigation.css";
import Button from "../Button/Button"


 class Navigation extends Component{
     render(){
        return (
            <div className="container-min">
                <img src={logo} className="main-logo"/>
                <Button label="Выйти" name="button-admin-exit" clickHandler ={this.props.onLogout}/>
            </div>            
        )
     }
}
export default Navigation;