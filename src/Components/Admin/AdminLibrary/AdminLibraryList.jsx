import React from 'react';
import PropTypes from 'prop-types';
import { getLibraryItems } from '../../../libraryCalls';
import AdminLibraryItem from './AdminLibraryItem';

class AdminLibraryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      libraryItems: [],
    };
  }

  componentDidMount() {
    this.setLibraryItems(this.props.match.params);
  }

  setLibraryItems({ category, type }) {
    getLibraryItems(category, type).then(libraryItems => this.setState({ libraryItems }));
  }

  render() {
    return (
      <div>
        {this.state.libraryItems.map(item => <AdminLibraryItem {...item} key={item._id} />)}
      </div>
    );
  }
}

export default AdminLibraryList;

AdminLibraryList.propTypes = {
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
