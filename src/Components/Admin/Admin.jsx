import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Admin.css';
import AdminNews from './AdminNews';
import EditNews from './AddEditNews/EditNews';
import AddNews from './AddEditNews/AddNews';
import AdminLibraryList from './AdminLibraryList';

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
          Посмотреть все элементы библиотеки
        </Link>
      </div>
      <Switch>
        <Route exact path={`${match.url}/news`} component={AdminNews} />
        <Route path={`${match.url}/addNews`} component={AddNews} />
        <Route path={`${match.url}/news/edit/:id`} component={EditNews} />
        <Route exact path={`${match.url}/library`} component={AdminLibraryList} />
        <Redirect to={`${match.url}/news`} />
      </Switch>
    </div>
  </div>
);

export default Admin;

Admin.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
