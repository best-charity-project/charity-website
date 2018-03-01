import React from 'react';
import { getLibraryItems } from '../../../libraryCalls';
import LibraryItem from '../LibraryItem/LibraryItem';

class LibraryItemsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      libraryItems: [],
    };
  }
  componentDidMount() {
    this.setLibraryItems();
  }
  setLibraryItems() {
    getLibraryItems().then(libraryItems => this.setState({ libraryItems }));
  }
  render() {
    return (
      <div>
        <h2>Список документов библиотеки: </h2>
        <ul>
          {this.state.libraryItems.map(item => (
            <li key={item._id}>
              <LibraryItem
                title={item.title}
                type={item.type}
                description={item.description}
                url={item.url}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default LibraryItemsList;
