import React, { Component } from 'react';
import {BrowserRouter , Route , Switch, Redirect } from "react-router-dom";
import { getToken } from "../Auth";

const PrivateRoute = ({ component: Component,protectLink, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                getToken() && getToken() !== 'undefined' ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: protectLink ? protectLink :'/login',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
