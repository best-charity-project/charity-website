import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import AddCategoryPage from './AddCategoryPage';
import CategoriesManagement from './CategoriesManagement';
import Message from '../../Message/Message';
import { clearMessageTimer } from '../../../configs/config.json';

class CategoriesManagementPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        type: '',
        text: '',
      },
    };
    this.showMessage = this.showMessage.bind(this);
  }

  showMessage(message) {
    this.setState({ message });
    this.clearMessage();
  }

  clearMessage() {
    setTimeout(() => {
      this.setState({ message: null });
    }, clearMessageTimer);
  }

  render() {
    return (
      <div className='tabs-box'>
        <h2 className='library-items--heading'>Управление категориями</h2>
        <Switch>
          <Route
            exact
            path={`${this.props.match.url}`}
            render={() => <CategoriesManagement showMessage={this.showMessage} />}
          />
          <Route
            path={`${this.props.match.url}/addCategory`}
            render={() => <AddCategoryPage showMessage={this.showMessage} />}
          />
          <Redirect to={`${this.props.match.url}`} />
        </Switch>
        <Message {...this.state.message} />
      </div>
    );
  }
}

export default CategoriesManagementPage;

CategoriesManagementPage.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
