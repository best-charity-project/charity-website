import React from 'react';
import PropTypes from 'prop-types';
import BookIcon from '../../icons/book.svg';
import ArticleIcon from '../../icons/article.svg';
import VideoIcon from '../../icons/video.svg';
import EducMaterialIcon from '../../icons/study.svg';
import './LibraryItem.css';

class LibraryItem extends React.Component {
  constructor(props) {
    super(props);
    this.iconHandler = this.iconHandler.bind(this);
  }
  componentDidMount() {
    this.iconHandler();
  }
  iconHandler() {
    let icon;
    switch (this.props.type) {
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
        icon = EducMaterialIcon;
        break;
      default:
        icon = '';
    }
    return icon;
  }

  render() {
    return (
      <div className='library-item'>
        <a href={this.props.url} className='library-item--link'>
          <h2 className='link--title'>{this.props.title}</h2>
        </a>
        <div className='library-item--type'>
          <img src={this.iconHandler()} alt='Иконка' className='type--icon' />
          <p className='type--text'>{this.props.type}</p>
        </div>
        <p className='library-item--description'>{this.props.description}</p>
      </div>
    );
  }
}
LibraryItem.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
export default LibraryItem;
