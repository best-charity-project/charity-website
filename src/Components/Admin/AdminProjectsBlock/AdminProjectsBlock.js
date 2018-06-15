import React from "react";
import "./AdminProjectsBlock.css";
import NavBar from '../../NavBar/NavBar';
import Navigation from '../../Navigation/Navigation';
import AdminProjectsContent from '../AdminComponents/AdminProjectsContent/AdminProjectsContent'

const AdminProjectsBlock = () =>{
    return (
        <div className='admin-projects'>
            <Navigation/>
            <NavBar />
            <AdminProjectsContent />
        </div>
    )
}
export default AdminProjectsBlock;