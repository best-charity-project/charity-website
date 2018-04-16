import React from 'react';
import { Route, Switch, Link, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import AdminNews from './AdminNews';
import EditNews from './AddEditNews/EditNews';
import AddNews from './AddEditNews/AddNews';
import AdminLibrary from './AdminLibrary';
import AdminOrganizations from './AdminOrganizations/AdminOrganizations';
import '../Sidebar/Sidebar.css';

const Admin = ({ match, userInfo }) => (
  <div className='admin indent'>
    {userInfo.admin && (
      <div className='sidebar'>
        <div className='sidebar--navigation'>
          <Link to={`${match.url}/news`} className='sidebar--link'>
            Посмотреть все новости
          </Link>
          <Link to={`${match.url}/addNews`} className='sidebar--link'>
            Добавить новость
          </Link>
          <Link to={`${match.url}/library`} className='sidebar--link'>
            Библиотека
          </Link>
          <Link to={`${match.url}/organizations/`} className='sidebar--link'>
            Организации
          </Link>
        </div>
        <Switch>
          <Route path={`${match.url}/news/edit/:id`} component={EditNews} />
          <Route exact path={`${match.url}/news`} component={AdminNews} />
          <Route path={`${match.url}/addNews`} component={AddNews} />
          <Route path={`${match.url}/library`} component={AdminLibrary} />
          <Route path={`${match.url}/organizations/`} component={AdminOrganizations} />
          <Redirect to={`${match.url}/news`} />
        </Switch>
      </div>
    )}
    {userInfo.admin === false && <Redirect to='/login' />}
    {userInfo.admin === undefined && <p>Загрузка...</p>}
  </div>
);

export default withRouter(Admin);

Admin.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  userInfo: PropTypes.shape({
    admin: PropTypes.bool,
  }).isRequired,
};
