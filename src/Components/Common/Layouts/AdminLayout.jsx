import React from "react";
import Navigation from "../../Navigation/Navigation";
import NavBar from '../../NavBar/NavBar';
import PrivateRoute from "./../../Admin/Auth/PrivateRoute";
import './Layouts.css'

const AdminLayout = ({ component: Component, ...rest }) => {
  return (
    <PrivateRoute
      {...rest}
      component={matchProps => (
        <div className="admin-content">
          <Navigation onLogout={this.onLogout} />
          <NavBar />
          <Component {...matchProps} />
        </div>
      )}
    />
  );
};

export default AdminLayout;
