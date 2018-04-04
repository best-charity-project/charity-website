import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Link, Redirect, withRouter } from 'react-router-dom';
import EducationRoute from '../EducationRoute/EducationRoute';
import EducationRouteSearch from '../EducationRouteSearch/EducationRouteSearch';
import ChangePassPage from '../ChangePasswordPage/ChangePassPage';

const UserAccount = ({ userInfo, match }) => (
  <div className='account indent'>
    {userInfo.name && (
      <div className='sidebar'>
        <div className='sidebar--navigation'>
          <Link to={`${match.url}/education-route-form`} className='sidebar--link'>
            Анкета образовательного маршрута
          </Link>
          <Link to={`${match.url}/education-route-search`} className='sidebar--link'>
            поиск участников <br />образовательного маршрута
          </Link>
          <Link to={`${match.url}/change-password`} className='sidebar--link'>
            Сменить пароль
          </Link>
        </div>
        <Switch>
          <Route
            path={`${match.url}/education-route-form`}
            render={() => <EducationRoute {...userInfo} />}
          />
          <Route path={`${match.url}/education-route-search`} component={EducationRouteSearch} />
          <Route path={`${match.url}/change-password`} component={ChangePassPage} />
        </Switch>
      </div>
    )}
    {userInfo.name === '' && <Redirect to='/login' />}
    {userInfo.name === undefined && <p>Загрузка...</p>}
  </div>
);

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
