import React from 'react';
import { getOrganizations } from '../../organizationsCalls';
import Organization from './Organization';
import './ListOfOrganizations.css';

class OrganizationsPage extends React.Component {
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
          {this.state.organizations.map(item => Organization(item))}
        </div>
      </div>
    );
  }
}

export default OrganizationsPage;
