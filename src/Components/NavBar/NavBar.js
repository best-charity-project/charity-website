import React from 'react';
import "./NavBar.css";
import MainList from "../Menu/MenuLinks";

const NavBar = ()=>{
    return (
        <div className="navbar">
                 <MainList
                     className="menu-list-admin" 
                     list = {[
                         {name: 'Список пользователей', url :'/admin-panel/dashboard'},
                         {name: 'События', url :'/admin-panel/events'},
                         {name: 'Новости', url : '/admin-panel/news'}
                     ]} 
                     onClick = {this.handlerClick}
                     classActive = 'active-link-admin'/>
        </div>       
    )
}
export default NavBar;