import React, { Component } from 'react';
import {BrowserRouter , Route , Switch , NavLink } from "react-router-dom";
import "./NavBar.css";
import logo from "../../Assets/AssetsSvg/on-info-logo.svg";
import MainList from "../menu/MenuLinks";

const NavBar = ()=>{
    return (
        <div className="navbar">
                 <MainList
                     className="menu-list-admin" 
                     list = {[
                         {name: 'Список пользователей', url :'/admin-panel'},
                         {name: 'События', url :'/admin-panel/events'}
                     ]} 
                     onClick = {this.handlerClick}
                     classActive = 'active-link-admin'/>
        </div>       
    )
}
export default NavBar;