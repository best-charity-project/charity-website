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
import LoginPage from '../Login/LoginPage';
import SignupPage from '../Signup/SignupPage';
import { getUserAuthInfo, logoutUser } from '../../Auth/Auth';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    };
    this.onAuthChange = this.onAuthChange.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    getUserAuthInfo().then((userInfo) => {
      this.setState({
        userInfo,
      });
    });
  }

  onAuthChange(userInfo) {
    this.setState({
      userInfo,
    });
  }

  onLogout() {
    logoutUser();
    this.setState({
      userInfo: {},
    });
  }

  render() {
    return (
      <div className='app'>
        <Header {...this.state} onLogout={this.onLogout} />
        <Switch>
          <Route exact path='/home' component={Home} />
          <Route path='/admin' render={() => <Admin {...this.state} />} />
          <Route path='/about' component={About} />
          <Route path='/news/:id' component={SingleNewsPage} />
          <Route path='/news' component={News} />
          <Route path='/library' component={Library} />
          <Route path='/education-route' component={EducationRoute} />
          <Route path='/login' render={() => <LoginPage onAuthChange={this.onAuthChange} />} />
          <Route path='/signup' render={() => <SignupPage onAuthChange={this.onAuthChange} />} />
          <Redirect to='/home' />
        </Switch>
        <Footer />
      </div>
    );
  }
}
