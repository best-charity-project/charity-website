import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Admin.css';
import AdminNews from './AdminNews';
import EditNews from './AddEditNews/EditNews';
import AddNews from './AddEditNews/AddNews';

const Admin = ({ match }) => (
  <div className='admin indent'>
    <Link to={`${match.url}/news`} className='admin--link'>
      Посмотреть все новости
    </Link>
    <Link to={`${match.url}/addNews`} className='admin--link'>
      Добавить новость
    </Link>
    <Switch>
      <Route exact path={`${match.url}/news`} component={AdminNews} />
      <Route path={`${match.url}/addNews`} component={AddNews} />
      <Route path={`${match.url}/news/edit/:id`} component={EditNews} />
    </Switch>
  </div>
);

export default Admin;

Admin.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
