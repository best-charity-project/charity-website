import React from "react";
import "./AdminMain.css";
import AdminUsersContent from '../AdminComponents/AdminUsersContent/AdminUsersContent';
import NavBar from "../../NavBar/NavBar";
import Navigation from "../../Navigation/Navigation";

const AdminMain = () => {
    return (
        <div className="admin-content">
            <Navigation onLogout={this.onLogout} />
                    <NavBar/>
            <AdminUsersContent />
        </div>          
    )
}

export default AdminMain;
