import React from 'react';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import PendingOrganizations from './PendingOrganizations';
import AcceptedOrganizations from './AcceptedOrganizations';
import Message from '../../Message/Message';
import { clearMessageTimer } from '../../../configs/config.json';

export default class AdminOrganizations extends React.Component {
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

  componentWillUnmount() {
    clearTimeout(this.timerId);
  }

  showMessage(message) {
    this.setState({ message });
    this.clearMessage();
  }

  clearMessage() {
    this.timerId = setTimeout(() => {
      this.setState({ message: null });
    }, clearMessageTimer);
  }

  render() {
    return (
      <div className='library--admin'>
        <NavLink to={`${this.props.match.url}/pending`} className='admin--library-link'>
          Заявки на добавление
        </NavLink>
        <NavLink to={`${this.props.match.url}/accepted`} className='admin--library-link'>
          Все организации
        </NavLink>
        <Switch>
          <Route
            path={`${this.props.match.url}/pending`}
            render={() => <PendingOrganizations showMessage={this.showMessage} />}
          />
          <Route
            path={`${this.props.match.url}/accepted`}
            render={() => <AcceptedOrganizations showMessage={this.showMessage} />}
          />
          <Redirect to={`${this.props.match.url}/pending`} />
        </Switch>
        <Message {...this.state.message} />
      </div>
    );
  }
}

AdminOrganizations.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
