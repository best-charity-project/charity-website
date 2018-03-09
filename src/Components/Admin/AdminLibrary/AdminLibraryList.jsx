import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import CategoriesList from '../../Library/CategoriesList/CategoriesList';
import LibraryItemsList from '../../Library/LibraryItemsList/LibraryItemsList';

const AdminLibraryList = ({ match }) => (
  <div className='library indent'>
    <div className='library--box'>
      <div className='library--board'>
        <Switch>
          <Route exact path={`${match.url}`} component={CategoriesList} />
          <Route path={`${match.url}/:category/:type`} component={LibraryItemsList} />
        </Switch>
      </div>
    </div>
  </div>
);

export default AdminLibraryList;

AdminLibraryList.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
