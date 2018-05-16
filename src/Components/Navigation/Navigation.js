import React from "react";
import { NavLink } from "react-router-dom";
import logo from './img/logo.svg';
import "./Navigation.css"
const Navigation = ()=>{
    return (
        <div>
            <NavLink to="/"><img src={ logo } alt=" " className="main-logo"/></NavLink>
        </div>          
    )
}
export default Navigation;