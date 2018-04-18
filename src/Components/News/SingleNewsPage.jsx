import React from 'react';
import PropTypes from 'prop-types';
import { getNewsById } from '../../newsCalls';
import cancelablePromise from '../../utils/cancelablePromise';
import './SingleNewsPage.css';

export default class SingleNewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: {
        title: '',
        newsText: '',
      },
    };
  }

  componentDidMount() {
    this.setNews();
  }

  componentWillUnmount() {
    this.cancelablePromise.cancel();
  }

  setNews() {
    const { id } = this.props.match.params;
    this.cancelablePromise = cancelablePromise(getNewsById(id));
    this.cancelablePromise.promise
      .then((news) => {
        this.setState({ news });
      })
      .catch((err) => {
        window.console.log(err);
      });
  }

  render() {
    return (
      <div className='news-item indent'>
        <h2 className='news-item--heading'>{this.state.news.title}</h2>
        <p className='news-item--text'>{this.state.news.newsText}</p>
      </div>
    );
  }
}

SingleNewsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
