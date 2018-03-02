import React from 'react';
import PropTypes from 'prop-types';
import BookIcon from '../../icons/book.svg';
import ArticleIcon from '../../icons/article.svg';
import VideoIcon from '../../icons/video.svg';
import EducationalMaterialIcon from '../../icons/study.svg';
import './LibraryItem.css';

const LibraryItem = ({
  title, url, description, type,
}) => {
  function iconHandler() {
    let icon;
    switch (type) {
      case 'article':
        icon = ArticleIcon;
        break;
      case 'video':
        icon = VideoIcon;
        break;
      case 'literature':
        icon = BookIcon;
        break;
      case 'studyMaterial':
        icon = EducationalMaterialIcon;
        break;
      default:
        icon = '';
    }
    return icon;
  }
  return (
    <div className='library-item'>
      <a href={url} className='library-item--link'>
        <h2 className='link--title'>{title}</h2>
      </a>

      <img src={iconHandler()} alt='Иконка' className='type--icon' />

      <p className='library-item--description'>{description}</p>
    </div>
  );
};

export default LibraryItem;

LibraryItem.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
