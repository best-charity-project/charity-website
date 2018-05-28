import React, { Component } from 'react';
import {BrowserRouter , Route , Switch, Redirect } from "react-router-dom";
import GetToken from "../Auth/GetToken";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                GetToken() && GetToken() !== 'undefined' ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/admin-panel',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
