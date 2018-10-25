import React, { Component } from "react";
import "./CharityPagination.css";

class CharityPagination extends Component {
  state = {
    currentPage: 1,
    pagesCount: 1
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.itemsCount === prevState.itemsCount) {
      return;
    }
    return {
      pagesCount: Math.ceil(nextProps.itemsCount / nextProps.pageSize)
    };
  }

  handlePageChange = pageStep => {
    const tempPage = this.state.currentPage + pageStep;
    if (tempPage < 1 || tempPage > this.state.pagesCount) {
      return;
    }

    this.setState(
      { currentPage: tempPage },
      () =>this.props.onPageChange(this.state.currentPage)
    );
  };
  render() {
    return (
      <div className={this.props.className + " charity-pagination"}>
        <div className="charity-pagination-row">
          <span className="charity-pagination-text">
            Вы находитесь на <span>1</span> странице из {this.state.pagesCount}
          </span>
        </div>
        <div className="charity-pagination-row">
          <button
            className="charity-pagination-btn btn-arrow charity-pagination-btn-left"
            onClick={() => this.handlePageChange(-1)}
          >
            <div className="arrow-wrapper">
              <div className="arrow-divider" />
            </div>
          </button>
          <button
            className="charity-pagination-btn btn-arrow charity-pagination-btn-right"
            onClick={() => this.handlePageChange(1)}
          >
            <div className="arrow-wrapper">
              <div className="arrow-divider" />
            </div>
          </button>
        </div>
      </div>
    );
  }
}

export default CharityPagination;
