import React from 'react';
import PropTypes from 'prop-types';

const LibraryItem = ({ title, url, description }) => (
  <div className='library-item'>
    <a href={url} className='library-item--link'>
      <h2 className='link--title'>{title}</h2>
    </a>
    <div className='library-item--type' />
    <p className='library-item--description'>{description}</p>
  </div>
);

export default LibraryItem;

LibraryItem.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
