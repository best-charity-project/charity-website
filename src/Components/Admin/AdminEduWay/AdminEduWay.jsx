import React from 'react';
import NavBar from '../../NavBar/NavBar';
import Navigation from '../../Navigation/Navigation';
import MarkerList from '../../EduWayMarkersList/EduWayMarkersList';

const AdminEduWay = () => {
  return (
    <div className="admin-content">
      <Navigation onLogout={this.onLogout} />
      <NavBar />
      <MarkerList />
    </div>
  );
};

export default AdminEduWay;
