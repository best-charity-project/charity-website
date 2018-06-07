import React, { Component } from 'react';
import {BrowserRouter , Route , Switch, Redirect } from "react-router-dom";
import './App.css';
import Home from "./Pages/Home/MainPage";
import Navigation from "./Components/Navigation/Navigation";
import Error from "./Components/Error/Error";
import Admin from "./Pages/Admin/Admin";
import PageNews from "./Pages/News/News";
import FullNew from './Components/FullNew/FullNew';

import "./App.css"
import AdminMain from './Components/Admin/AdminMain/AdminMain';
import AdminEvents from './Components/Admin/AdminEvents/AdminEvents';
import AdminNewsBlock from './Components/Admin/AdminNewsBlock/AdminNewsBlock';
import AdminAddNews from './Components/Admin/AdminAddNews/AdminAddNews';
import { fakeAuth } from './Components/Admin/Auth/PrivateRoute';
import PrivateRoute from "../src/Components/Admin/Auth/PrivateRoute";
import { getToken } from './Components/Admin/Auth';
import Events from './Pages/Events/Events';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className = "container-main">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Admin} />
            <PrivateRoute path="/admin-panel/dashboard" component={AdminMain} />
            <PrivateRoute path="/admin-panel/events" component={AdminEvents} />
            <PrivateRoute  path="/admin-panel/news" component={AdminNewsBlock} exact />
            <PrivateRoute path="/admin-panel/news/create" component={AdminAddNews} />
            <Route path="/news/:id" component={FullNew} />
            <Route path="/news" component={PageNews} />
            <Route path="/events" component={Events} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

