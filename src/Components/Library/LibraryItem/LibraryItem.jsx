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
    this.state = {
      type: ['Статьи', 'Видео', 'Литература', 'Учебные материалы'],
      icon: '',
    };
  }
  componentDidMount() {
    this.iconHandler();
  }
  iconHandler() {
    switch (this.props.type) {
      case this.state.type[0]:
        this.setState({ icon: ArticleIcon });
        break;
      case this.state.type[1]:
        this.setState({ icon: VideoIcon });
        break;
      case this.state.type[2]:
        this.setState({ icon: BookIcon });
        break;
      case this.state.type[3]:
        this.setState({ icon: EducMaterialIcon });
        break;
      default:
        this.setState({ icon: '' });
    }
  }

  render() {
    return (
      <div className='library-item'>
        <a href={this.props.url} className='library-item--link'>
          <h2 className='link--title'>{this.props.title}</h2>
        </a>
        <div className='library-item--type'>
          <img src={this.state.icon} alt='Icon' className='type--icon' />
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
