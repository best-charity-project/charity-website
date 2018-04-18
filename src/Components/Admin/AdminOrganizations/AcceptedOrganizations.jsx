import React from 'react';
import { getOrganizations } from '../../../organizationsCalls';
import AcceptedItem from './AcceptedItem';

class AcceptedOrganizations extends React.Component {
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
      <div className='tabs-box'>
        <h2 className='secondary-heading'>Все организации</h2>
        {this.state.organizations.map(item => <AcceptedItem key={item._id} {...item} />)}
      </div>
    );
  }
}


export default AcceptedOrganizations;
