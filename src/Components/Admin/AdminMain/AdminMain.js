import React from "react";
import "./AdminMain.css";
import AdminUsersContent from '../AdminComponents/AdminUsersContent/AdminUsersContent';

const AdminMain = () => {
    return (
        <div className="admin-content">
            <AdminUsersContent />
        </div>          
    )
}

export default AdminMain;