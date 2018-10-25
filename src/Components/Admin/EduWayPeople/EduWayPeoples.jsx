import React from 'react';
import NavBar from '../../NavBar/NavBar';
import Navigation from '../../Navigation/Navigation';
import EduWayPeoples from '../../EduWayPeoplesList/EduWayPeoples';

const AdminEduWay = () => {
  return (
    <div className="admin-content">
      <Navigation onLogout={this.onLogout} />
      <NavBar />
      <EduWayPeoples />
    </div>
  );
};

export default AdminEduWay;
