import React from 'react';
import { getPendingItems } from '../../../libraryCalls';
import PendingItem from './PendingItem';
import './PendingItemsPage.css';

class PendingItemsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingItems: [],
    };
  }

  componentDidMount() {
    this.setCategories();
  }

  setCategories() {
    getPendingItems().then(pendingItems => this.setState({ pendingItems }));
  }

  render() {
    return (
      <div className='admin--library-items'>
        <h2 className='library-items--heading'>Заявки на добавление в библиотеку </h2>
        {this.state.pendingItems.map(item => <PendingItem key={item._id} {...item} />)}
      </div>
    );
  }
}

export default PendingItemsList;
