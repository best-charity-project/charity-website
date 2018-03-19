import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { getLibraryItems } from '../../../libraryCalls';
import AdminLibraryItem from './AdminLibraryItem';
import BackIcon from '../../icons/back.svg';

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
        <img src={BackIcon} alt='иконка' className='library-items--icon' />
        <NavLink to='/admin/library/libraryItems' className='library-items--link'>
          Вернуться к списку
        </NavLink>
        {this.state.libraryItems.map(item => <AdminLibraryItem {...item} key={item._id} />)}
      </div>
    );
  }
}

export default AdminLibraryList;

AdminLibraryList.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      category: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
