import React, { Component } from 'react';
import {BrowserRouter , Route , Switch, Redirect } from "react-router-dom";
import GetToken from "../Auth/GetToken";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !!GetToken() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/',
                        state: { from: props.location },
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;
