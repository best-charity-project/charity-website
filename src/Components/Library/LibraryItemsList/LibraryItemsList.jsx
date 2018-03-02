import React from 'react';
import PropTypes from 'prop-types';
import { getCategoryItems } from '../../../libraryCalls';
import LibraryItem from '../LibraryItem/LibraryItem';
import './LibraryItemsList.css';

class LibraryItemsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      libraryItems: [],
    };
  }

  componentDidMount() {
    const { category, type } = this.props.match.params;
    getCategoryItems(category, type).then(libraryItems => this.setState({ libraryItems }));
  }

  render() {
    return (
      <ul>
        <h2 className='library-items--heading'>Список документов библиотеки: </h2>
        {this.state.libraryItems.map(item => (
          <li key={item._id}>
            <LibraryItem {...item} />
          </li>
        ))}
      </ul>
    );
  }
}

export default LibraryItemsList;

LibraryItemsList.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      category: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
