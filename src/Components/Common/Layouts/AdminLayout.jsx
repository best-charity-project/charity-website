import React from "react";
import Navigation from "../../Navigation/Navigation";
import PrivateRoute from "./../../Admin/Auth/PrivateRoute";
import './Layouts.css'

const AdminLayout = ({ component: Component, ...rest }) => {
  return (
    <PrivateRoute
      {...rest}
      component={matchProps => (
        <div className="admin-content">
          <Navigation onLogout={this.onLogout} />
          <Component {...matchProps} />
        </div>
      )}
    />
  );
};

export default AdminLayout;
