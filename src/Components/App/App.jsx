import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import Admin from '../Admin/Admin';
import About from '../About/About';
import News from '../News/News';
import Library from '../Library/Library';
import SingleNewsPage from '../News/SingleNewsPage';
import EducationRoute from '../EducationRoute/EducationRoute';
import './App.css';

export default () => (
  <div className='app'>
    <Header />
    <Switch>
      <Route exact path='/home' component={Home} />
      <Route path='/admin' component={Admin} />
      <Route path='/about' component={About} />
      <Route path='/news/:id' component={SingleNewsPage} />
      <Route path='/news' component={News} />
      <Route path='/library' component={Library} />
      <Route path='/education-route' component={EducationRoute} />
      <Redirect to='/home' />
    </Switch>
    <Footer />
  </div>
);
