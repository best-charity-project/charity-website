import React from 'react';
import PropTypes from 'prop-types';
import { fullTextLibrarySearch } from '../../../libraryCalls';
import LibraryItem from '../LibraryItem/LibraryItem';
import DetailsButton from '../../DetailsButton/DetailsButton';

class LibrarySearchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      libraryItems: [],
    };
  }
  componentDidMount() {
    const urlParams = new URLSearchParams(this.props.location.search);
    this.searchText(urlParams);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    const urlParams = new URLSearchParams(nextProps.location.search);
    this.searchText(urlParams);
  }

  searchText(urlParams) {
    const textSearch = encodeURIComponent(urlParams.get('textSearch'));
    const types = urlParams.get('types');
    fullTextLibrarySearch(textSearch, types).then(libraryItems => this.setState({ libraryItems }));
  }

  render() {
    return this.state.libraryItems.map(item => (
      <div key={item._id} className='library-item'>
        <LibraryItem {...item} />
        <DetailsButton
          className='control-button control-button--blue'
          text='Подробнее'
          url={item.url}
        />
      </div>
    ));
  }
}

export default LibrarySearchList;

LibrarySearchList.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};
