import React from 'react';
import { withRouter } from 'react-router-dom';
import { getPendingOrganizations } from '../../../organizationsCalls';
import PendingItem from './PendingItem';
import './PendingOrganizations.css';
import '../../Tabs/Tabs.css';

class PendingOrganizations extends React.Component {
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
      <div className='tabs-box'>
        <h2 className='secondary-heading'>Заявки на добавление</h2>
        {this.state.pendingItems.map(item => (
          <PendingItem key={item._id} {...item} {...this.props} />
        ))}
      </div>
    );
  }
}

export default withRouter(PendingOrganizations);
