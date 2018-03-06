import React from 'react';
import PropTypes from 'prop-types';
import { getCategoryItems } from '../../../libraryCalls';
import LibraryItem from '../LibraryItem/LibraryItem';

class LibraryItemsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      libraryItems: [], locale: true,
    };
  }

  componentDidMount() {
    this.setLibraryItems();
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.renderLibraryItems(nextProps);
      this.setState({
        locale: !this.state.locale,
      });
    }

    return true;
  }


  setLibraryItems() {
    const { category, type } = this.props.match.params;
    getCategoryItems(category, type).then(libraryItems => this.setState({ libraryItems }));
  }

  renderLibraryItems(nextProps) {
    const { category, type } = nextProps.match.params;
    getCategoryItems(category, type).then(libraryItems => this.setState({ libraryItems }));
  }

  render() {
    return (
      <div>
        {this.state.libraryItems.map(item => (
          <LibraryItem {...item} key={item._id} />
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
