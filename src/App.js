import React, { Component } from 'react';
import {BrowserRouter , Route , Switch, Redirect } from "react-router-dom";
import './App.css';
import Home from "./Pages/Home/MainPage";
import Navigation from "./Components/Navigation/Navigation";
import Error from "./Components/Error/Error";
import Admin from "./Pages/Admin/Admin";

import "./App.css"
import AdminMain from './Components/Admin/AdminMain/AdminMain';
import { fakeAuth } from './Components/Admin/Auth/PrivateRoute';
import PrivateRoute from "../src/Components/Admin/Auth/PrivateRoute";
import GetToken from './Components/Admin/Auth/GetToken';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className = "container-main">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/admin-panel" component={Admin}/>
            <PrivateRoute path="/dashboard" component={AdminMain}/>
            <Route component={Error}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
