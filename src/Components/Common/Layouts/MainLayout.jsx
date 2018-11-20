import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from '../../Admin/Auth/PrivateRoute';
import Menu from "../../Menu/Menu";
import Footer from './../../Footer/Footer';
import './Layouts.css'

const renderComponent = (matchProps, Component) => {
  return (
    <div className="main-page-client">
      <Menu name="client-menu" />
      <Component {...matchProps} />
      <Footer name = 'footer-client'/>
    </div>
  );
};

const PublicLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => renderComponent(matchProps, Component)}
    />
  );
};

const PrivateLayout = ({ component: Component, ...rest }) => {
  console.log(...rest)
  return (
    <PrivateRoute
      {...rest}
      component={matchProps => renderComponent(matchProps, Component)}
    />
  );
};

export { PublicLayout, PrivateLayout };
