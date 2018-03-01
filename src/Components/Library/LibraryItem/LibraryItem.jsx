import React from 'react';
import PropTypes from 'prop-types';
import BookIcon from '../../icons/book.svg';
import ArticleIcon from '../../icons/article.svg';
import VideoIcon from '../../icons/video.svg';
import EducMaterialIcon from '../../icons/educMaterial.svg';
import './LibraryItem.css';

class LibraryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: ['article', 'video', 'literature', 'studyMaterial'],
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
        this.setState({ icon: 'qqq' });
    }
  }

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <p>{this.props.type}</p>
        <p>
          <img src={this.state.icon} alt='Icon' />
        </p>
        <p>{this.props.description}</p>
        <p>{this.props.url}</p>
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
