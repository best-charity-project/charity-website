import React from "react";
import {BrowserRouter , Route , Switch , NavLink } from "react-router-dom";
import "./AdminMain.css";
import AdminUsersContent from '../AdminComponents/AdminUsersContent/AdminUsersContent';
import AdminNewsBlock from '../AdminNewsBlock/AdminNewsBlock';
import AdminAddNews from '../AdminAddNews/AdminAddNews';
import NavBar from "../../NavBar/NavBar";
import Navigation from "../../Navigation/Navigation";
import AdminEvents from "../AdminEvents/AdminEvents";

const AdminMain = () => {
    return (
        <div className="admin-content">
            <Navigation onLogout={this.onLogout} />
            <NavBar/>
            <Switch>
                    <Route path="/admin-panel/dashboard" component={AdminUsersContent} exact />
                    <Route path="/admin-panel/events" component={AdminEvents}/>
                    <Route path="/admin-panel/news" component={AdminNewsBlock} exact/>
                    <Route path="/admin-panel/news/create" component={AdminAddNews}/>
            </Switch>
        </div>          
    )
}

export default AdminMain;
