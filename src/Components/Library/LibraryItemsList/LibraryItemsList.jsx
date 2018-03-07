import React from 'react';
import PropTypes from 'prop-types';
import { getLibraryCategories } from '../../../libraryCalls';
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
    this.setLibraryItems(this.props.match.params);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.setLibraryItems(nextProps.match.params);
    }
  }

  setLibraryItems({ category, type }) {
    getLibraryCategories(category, type).then(libraryItems => this.setState({ libraryItems }));
  }

  render() {
    return (
      <div>
        {this.state.libraryItems.map(item => (
          <div key={item._id} className='library-item'>
            <LibraryItem {...item} />
            <DetailsButton
              className='control-button control-button--blue'
              text='Подробнее'
              url={item.url}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default LibraryItemsList;
LibraryItemsList.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      category: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
