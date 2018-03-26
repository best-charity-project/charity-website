import React from 'react';
import { Route, Switch, Link, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Admin.css';
import AdminNews from './AdminNews';
import EditNews from './AddEditNews/EditNews';
import AddNews from './AddEditNews/AddNews';
import AdminLibrary from './AdminLibrary';

const Admin = ({ match }) => (
  <div className='admin indent'>
    <div className='admin--box'>
      <div className='admin--sidebar'>
        <Link to={`${match.url}/news`} className='admin--link'>
          Посмотреть все новости
        </Link>
        <Link to={`${match.url}/addNews`} className='admin--link'>
          Добавить новость
        </Link>
        <Link to={`${match.url}/library`} className='admin--link'>
          Библиотека
        </Link>
      </div>
      <Switch>
        <Route exact path={`${match.url}/news`} component={AdminNews} />
        <Route path={`${match.url}/addNews`} component={AddNews} />
        <Route path={`${match.url}/news/edit/:id`} component={EditNews} />
        <Route path={`${match.url}/library`} component={AdminLibrary} />
        <Redirect to={`${match.url}/news`} />
      </Switch>
    </div>

    {/* {!userInfo.admin && <Redirect to='/home' />} */}
    {/* {!userInfo.admin === undefined && <h1>Загрузка...</h1>} */}
  </div>
);

export default withRouter(Admin);

Admin.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
