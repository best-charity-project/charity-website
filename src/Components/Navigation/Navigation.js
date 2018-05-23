import React , { Component } from "react";
import { NavLink } from "react-router-dom";

import logo from "../../Assets/images/logo.svg"
import "./Navigation.css";
import Button from "../Button/Butt"


 class Navigation extends Component{
     render(){
        return (
            <div className="container-min">
                <Button label="Выйти" name="button-admin-exit" clickHandler ={this.props.onLogout}/>
            </div>            
        )
     }
}
export default Navigation;