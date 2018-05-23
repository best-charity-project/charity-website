import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../Assets/images/logo.svg";

const MainLogo = () => {
    return (
        <div>
            <NavLink to="/"><img src={logo} alt=" " className="main-logo"/></NavLink>
        </div>          
    );
};
export default MainLogo ;
