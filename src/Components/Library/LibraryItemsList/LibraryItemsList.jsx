import React from 'react';
import PropTypes from 'prop-types';
import { getCategoryItems } from '../../../libraryCalls';
import LibraryItem from '../LibraryItem/LibraryItem';
import DetailsButton from '../../DetailsButton/DetailsButton';

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
    const { category, type } = this.props.match.params;
    getCategoryItems(category, type).then(libraryItems => this.setState({ libraryItems }));
  }

  render() {
    return (
      <ul>
        {this.state.libraryItems.map(item => (
          <li key={item._id} className='library-item'>
            <LibraryItem {...item} />
            <DetailsButton
              className='control-button control-button--blue'
              text='Подробнее'
              url={item.url}
            />
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
