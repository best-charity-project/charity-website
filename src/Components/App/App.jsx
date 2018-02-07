import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/" component={Home}/>
          <Route path="/" component={Home}/>
          <Route path="/" component={Home}/>
          <Route path="/" component={Home}/>
          <Redirect to="/"/>
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default App