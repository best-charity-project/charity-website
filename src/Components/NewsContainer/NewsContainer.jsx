import React, { Component } from 'react';
import NewsListAndAside from '../NewsListAndAside/NewsListAndAside'
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import '../NewsContainer/NewsContainer.css';
class News extends Component {
  state = {
    events: {}
  }
  render() {
    return (
      <div className = 'news-container'> 
        <Menu name = 'client-menu'/>
        <NewsListAndAside/>
        <Footer name = ' footer footer-news'/>
    </div>
    );
  }

}

export default News;