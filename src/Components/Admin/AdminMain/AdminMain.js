import React from "react";
import {BrowserRouter , Route , Switch , NavLink } from "react-router-dom";
import "./AdminMain.css";
import AdminUsersContent from '../AdminComponents/AdminUsersContent/AdminUsersContent';
import NavBar from "../../NavBar/NavBar";
import Navigation from "../../Navigation/Navigation";
import AdminEvents from "../AdminEvents/AdminEvents";

const AdminMain = () => {
    return (
        <div className="admin-content">
            <Navigation onLogout={this.onLogout} />
            <NavBar/>
            <Switch>
                    <Route path="/dashboard" component={AdminUsersContent} exact />
                    <Route path="/dashboard/events" component={AdminEvents}/>
            </Switch>
        </div>          
    )
}

export default AdminMain;
