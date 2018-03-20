import React from 'react';
import PropTypes from 'prop-types';
import URLSearchParams from 'url-search-params';
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
    this.searchText(this.props.location.search);
  }

  componentWillReceiveProps(nextProps) {
    this.searchText(nextProps.location.search);
  }

  searchText(urlParams) {
    const urlParamsQuery = new URLSearchParams(urlParams);
    const textSearch = encodeURIComponent(urlParamsQuery.get('textSearch'));
    const types = urlParamsQuery.get('types');
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
