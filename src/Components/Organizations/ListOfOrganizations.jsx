import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getOrganizations } from '../../organizationsCalls';
import Organization from './Organization';
import './ListOfOrganizations.css';

class ListOfOrganizations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizations: [],
    };
  }

  componentDidMount() {
    this.setOrganizations();
  }

  setOrganizations() {
    getOrganizations().then(organizations => this.setState({ organizations }));
  }

  render() {
    return (
      <div>
        <h1 className='organizations-heading secondary-heading'>
          Справочник организаций занимающихся вопросами людей с особыми потребностями
        </h1>
        <div className='organizations--box'>
          <Link
            to={`${this.props.match.url}/${this.props.userInfo ? 'addOrganization' : 'login'}`}
            className='control-button control-button-tertiary control-button-small'
          >
            Добавить организацию
          </Link>
          {this.state.organizations.map(item => Organization(item))}
        </div>
      </div>
    );
  }
}

export default ListOfOrganizations;

ListOfOrganizations.defaultProps = {
  userInfo: '',
};

ListOfOrganizations.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  userInfo: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
