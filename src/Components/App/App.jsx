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
import LoginPage from '../Login/LoginPage';
import SignupPage from '../Signup/SignupPage';
import { getUserAuthInfo, logoutUser } from '../../Auth/Auth';
import RestorePasswordPage from '../RestorePasswordPage/RestorePasswordPage';
import UserAccount from '../UserAccount/UserAccount';
import ChangeForgottenPasswordPage from '../ChangeForgottenPasswordPage/ChangeForgottenPasswordPage';
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
    getUserAuthInfo()
      .then((userInfo) => {
        this.setState({
          userInfo,
        });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.setState({ userInfo: { admin: false, name: '' } });
        }
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
      userInfo: { admin: false, name: '' },
    });
  }

  render() {
    return (
      <div className='app'>
        <Header {...this.state} onLogout={this.onLogout} />
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/admin' render={() => <Admin {...this.state} />} />
          <Route path='/about' component={About} />
          <Route path='/news/:id' component={SingleNewsPage} />
          <Route path='/news' component={News} />
          <Route path='/library' render={() => <Library {...this.state} />} />
          <Route path='/login' render={() => <LoginPage onAuthChange={this.onAuthChange} />} />
          <Route path='/signup' render={() => <SignupPage onAuthChange={this.onAuthChange} />} />
          <Route path='/restore-password' component={RestorePasswordPage} />
          <Route path='/change-password/:token' component={ChangeForgottenPasswordPage} />
          <Route path='/account' render={() => <UserAccount {...this.state} />} />
          <Redirect to='/home' />
        </Switch>
        <Footer />
      </div>
    );
  }
}
