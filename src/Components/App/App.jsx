import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import Admin from '../Admin/Admin';
import About from '../About/About';
import News from '../News/News';
import Library from '../Library/Library';
import EducationRoute from '../EducationRoute/EducationRoute';
import LoginPage from '../Login/LoginPage';
import SignupPage from '../Signup/SignupPage';
import { isUserAuthenticated, logoutUser } from '../../Auth/Auth';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    };
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onSignup = this.onSignup.bind(this);
  }

  componentDidMount() {
    isUserAuthenticated().then((userInfo) => {
      this.setState({
        userInfo,
      });
    });
  }

  onSignup(userInfo) {
    this.setState({
      userInfo,
    });
  }

  onLogin(userInfo) {
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
          <Route path='/admin' render={() => <Admin userInfo={this.state.userInfo} />} />
          <Route path='/about' component={About} />
          <Route path='/news' component={News} />
          <Route path='/library' component={Library} />
          <Route path='/education-route' component={EducationRoute} />
          <Route path='/login' render={() => <LoginPage onLogin={this.onLogin} />} />
          <Route path='/signup' render={() => <SignupPage onSignup={this.onSignup} />} />
          <Redirect to='/home' />
        </Switch>
        <Footer />
      </div>
    );
  }
}
