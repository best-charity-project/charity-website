import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Admin from '../Admin/Admin';
import About from '../About/About';
import Home from '../Home/Home';
import News from '../News/News';
import NewsItem from '../News/NewsItem/NewsItem';

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
          <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/admin" component={Admin} />
          <Route path="/about" component={About} />
          <Route exact path="/news" component={News} />
          <Route path="/news/:id" component={NewsItem} />
          <Redirect to="/" />
        </Switch>
        </div>
    )
  }
}
