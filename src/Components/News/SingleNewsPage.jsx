import React from 'react';
import PropTypes from 'prop-types';
import { getNewsById } from '../../newsCalls';
import './SingleNewsPage.css';

class SingleNewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: {
        title: '',
        shortDescription: '',
      },
    };
  }

  componentDidMount() {
    this.setNews();
  }

  setNews() {
    const { id } = this.props.match.params;
    getNewsById(id).then((news) => {
      this.setState({ news });
    });
  }

  render() {
    return (
      <div className='news-item indent'>
        <h2 className='news-item--heading'>{this.state.news.title}</h2>
        <p className='news-item--text'>{this.state.news.shortDescription}</p>
      </div>
    );
  }
}

export default SingleNewsPage;

SingleNewsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
