import React from 'react';
import { getPendingItems } from '../../../libraryCalls';
import PendingItem from './PendingItem';
import './PendingItemsList.css';

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
        <ul>
          {this.state.pendingItems.map(item => (
            <li key={item._id}>
              <PendingItem title={item.title} description={item.description} url={item.url} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PendingItemsList;
