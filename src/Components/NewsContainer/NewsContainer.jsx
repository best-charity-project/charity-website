import React, { Component } from "react";
import NewsListAndAside from "../NewsListAndAside/NewsListAndAside";
import "../NewsContainer/NewsContainer.css";
import { server } from "../../api";
import axios from "axios";

class NewsContainer extends Component {
  state = {
    news: []
  };
  componentDidMount() {
    this.getNews();
    this.getFiltersListByType("news");
  }

  getFilteredNews = str => {
    str === "все" ? this.filterArray("") : this.filterArray(str);
  };

  getNews = () => {
    axios({ url: `${server}/api/news` }).then(res => {
      this.setState({ news: res.data.news }, () => {
        this.filterArray("");
      });
    });
  };
  getFiltersListByType = type => {
    axios({
      method: "get",
      url: `${server}/api/filters?type=${type}`
    }).then(res => {
      this.setState({ filters: res.data.filterList });
    });
  };
  filterArray = value => {
    if (value.length === 0) {
      this.setState({ filterArray: this.state.news });
    } else {
      let filterArray = this.state.news.filter(news => {
        return news.filter === value;
      });
      this.setState({ filterArray: filterArray });
    }
  };

  render() {
    return (
      <div className="news-container">
        <NewsListAndAside
          array={this.state.filterArray}
          filters={this.state.filters}
          getNewFilter={this.getFilteredNews}
        />
      </div>
    );
  }
}

export default NewsContainer;
