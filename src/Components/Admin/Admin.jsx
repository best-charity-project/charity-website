import React from 'react';
import { Route, Switch, Link, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Admin.css';
import AdminNews from './AdminNews';
import EditNews from './AddEditNews/EditNews';
import AddNews from './AddEditNews/AddNews';
import AdminLibrary from './AdminLibrary';
import { isUserAuthenticated } from '../../Auth/Auth';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
    };
  }

  componentDidMount() {
    isUserAuthenticated()
      .then((userInfo) => {
        if (userInfo.admin) {
          this.setState({ isAdmin: true });
        } else {
          this.props.history.push('/home');
        }
      })
      .catch((err) => {
        if (err) {
          this.props.history.push('/home');
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.userInfo.admin) {
      this.props.history.push('/home');
    }
    this.setState({ isAdmin: nextProps.userInfo.admin });
  }

  render() {
    return (
      <div className='admin indent'>
        {this.state.isAdmin && (
          <div className='admin--box'>
            <div className='admin--sidebar'>
              <Link to={`${this.props.match.url}/news`} className='admin--link'>
                Посмотреть все новости
              </Link>
              <Link to={`${this.props.match.url}/addNews`} className='admin--link'>
                Добавить новость
              </Link>
              <Link to={`${this.props.match.url}/library`} className='admin--link'>
                Библиотека
              </Link>
            </div>
            <Switch>
              <Route exact path={`${this.props.match.url}/news`} component={AdminNews} />
              <Route path={`${this.props.match.url}/addNews`} component={AddNews} />
              <Route path={`${this.props.match.url}/news/edit/:id`} component={EditNews} />
              <Route path={`${this.props.match.url}/library`} component={AdminLibrary} />
              <Redirect to={`${this.props.match.url}/news`} />
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Admin);

Admin.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  userInfo: PropTypes.shape({
    admin: PropTypes.bool,
  }).isRequired,
};
