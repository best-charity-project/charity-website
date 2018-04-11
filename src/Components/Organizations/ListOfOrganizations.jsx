import React from 'react';
import { getOrganizations } from '../../organizationsCalls';
import Organization from './Organization';
import ControlButton from '../ControlButton/ControlButton';
import './ListOfOrganizations.css';

class Organizations extends React.Component {
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
      <div className='organizations indent'>
        <h1 className='organizations-heading secondary-heading'>
          Справочник организаций занимающихся вопросами людей с особыми потребностями
        </h1>
        <div className='organizations--box'>
          {this.state.organizations.map(item => Organization(item))}
          <ControlButton
            text='Добавить организацию'
            className='control-button control-button-tertiary control-button-small'
          />
        </div>
      </div>
    );
  }
}

export default Organizations;
