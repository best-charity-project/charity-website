import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Link, Redirect, withRouter } from 'react-router-dom';
import EducationRoute from '../EducationRoute/EducationRoute';
import EducationRouteSearch from '../EducationRouteSearch/EducationRouteSearch';

class UserAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    };
  }

  render() {
    return (
      <div className='Account indent'>
        {this.props.userInfo.name && (
          <div className='admin--box'>
            <div className='admin--sidebar'>
              <Link to={`${this.props.match.url}/education-route-form`} className='admin--link'>
                Анкета образовательного маршрута
              </Link>
              <Link to={`${this.props.match.url}/education-route-search`} className='admin--link'>
                поиск участников <br />образовательного маршрута
              </Link>
            </div>
            <Switch>
              <Route path={`${this.props.match.url}/education-route-form`} render={() => <EducationRoute {...this.state} />} />
              <Route path={`${this.props.match.url}/education-route-search`} component={EducationRouteSearch} />
            </Switch>
          </div>
        )}
        {!this.props.userInfo.name && <Redirect to='/login' />}
        {this.props.userInfo.admin === undefined && <p>Загрузка...</p>}
      </div>
    );
  }
}

export default withRouter(UserAccount);

UserAccount.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.string,
    admin: PropTypes.bool,
  }).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
