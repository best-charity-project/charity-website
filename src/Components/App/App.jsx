import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import Admin from '../Admin/Admin';
import About from '../About/About';
import News from '../News/News';
import './App.css';

export default () => (
  <div className='app'>
    <Header />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/admin' component={Admin} />
      <Route path='/about' component={About} />
      <Route exact path='/news' component={News} />
      <Redirect to='/' />
    </Switch>
    <Footer />
  </div>
);
