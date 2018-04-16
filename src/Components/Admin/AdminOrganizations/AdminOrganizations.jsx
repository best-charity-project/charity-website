import React from 'react';
import { getPendingOrganizations } from '../../../organizationsCalls';
import PendingItem from './PendingOrganization';
import './AdminOrganizations.css';

class AdminOrganizations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingItems: [],
    };
  }

  componentDidMount() {
    this.setPendingItems();
  }

  setPendingItems() {
    getPendingOrganizations().then(pendingItems => this.setState({ pendingItems }));
  }

  render() {
    return (
      <div className='admin-organizations'>
        <h2 className='secondary-heading'>Заявки на добавление</h2>
        {this.state.pendingItems.map(item => <PendingItem key={item._id} {...item} />)}
      </div>
    );
  }
}

export default AdminOrganizations;
