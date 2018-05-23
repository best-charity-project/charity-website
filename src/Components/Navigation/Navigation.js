import React , { Component } from "react";
import { NavLink } from "react-router-dom";

import logo from "../../Assets/images/logo.svg"
import "./Navigation.css"
import MainLogo from "../MainLogo/MainLogo"
import Button from "../button/button"


 class Navigation extends Component{
     render(){
        return (
            <div className="container-min">
                <MainLogo/>
                <Button label="Выйти" name="button-admin-exit" clickHandler ={this.props.onLogout}/>
            </div>            
        )
     }
}
export default Navigation;