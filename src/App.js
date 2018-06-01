import React, { Component } from 'react';
import {BrowserRouter , Route , Switch } from "react-router-dom";
import './App.css';
import Home from "./Pages/Home/MainPage";
import Navigation from "./Components/Navigation/Navigation";
import Error from "./Components/Error/Error";
import Admin from "./Pages/Admin/Admin";
import PageNews from "./Pages/News/News";
import FullNew from './Components/FullNew/FullNew'

import "./App.css"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className = "container-main">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/admin-panel" component={Admin}/>            
            <Route path="/news/:id" component={FullNew} />
            <Route path="/news" component={PageNews}/>
            <Route component={Error}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
