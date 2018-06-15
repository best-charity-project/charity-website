import React from "react";
import AdminEventsContent from '../AdminComponents/AdminEventsContent/AdminEventsContent';
import './AdminEvents.css';
import NavBar from '../../NavBar/NavBar';
import Navigation from '../../Navigation/Navigation';

const AdminEvents = () => {
    return (
        <div className="admin-content">
            <Navigation onLogout={this.onLogout} />
            <NavBar />
            <AdminEventsContent />
        </div>          
    )
}

export default AdminEvents;

