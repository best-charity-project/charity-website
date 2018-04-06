import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Link, Redirect, withRouter } from 'react-router-dom';
import EducationRoute from '../EducationRoute/EducationRoute';
import EducationRouteSearch from '../EducationRouteSearch/EducationRouteSearch';
import ChangePassPage from '../ChangePasswordPage/ChangePassPage';
import CompletedEducationRouteForm from '../CompletedEducationRouteForm/CompletedEducationRouteForm';

const UserAccount = ({ userInfo, match }) => (
  <div className='account indent'>
    {userInfo.name && (
      <div className='sidebar'>
        <div className='sidebar--navigation'>
          <p className='sidebar--header'>Образовательный маршрут:</p>
          <Link to={`${match.url}/education-route-add-form`} className='sidebar--link'>
            Заполнить новую карту
          </Link>
          <Link to={`${match.url}/education-route-users-form`} className='sidebar--link'>
            Просмотр заполненных карт
          </Link>
          <Link to={`${match.url}/education-route-search`} className='sidebar--link'>
            поиск участников
          </Link>
          <Link to={`${match.url}/change-password`} className='sidebar--link'>
            Сменить пароль
          </Link>
        </div>
        <Switch>
          <Route
            path={`${match.url}/education-route-add-form`}
            render={() => <EducationRoute {...userInfo} />}
          />
          <Route
            path={`${match.url}/education-route-users-form`}
            render={() => <CompletedEducationRouteForm {...userInfo} />}
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
