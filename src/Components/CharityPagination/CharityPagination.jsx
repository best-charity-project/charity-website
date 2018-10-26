import React, { Component } from "react";
import "./CharityPagination.css";
import PropTypes from 'prop-types';

class CharityPagination extends Component {
  state = {
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

  handlePageChange = nextPage => {
    if (nextPage < 1 || nextPage > this.state.pagesCount) {
      return;
    }

    this.props.onPageChange(nextPage);
  };
  render() {
    const {className, currentPage} = this.props;
    return (
      <div className={className + " charity-pagination"}>
        <div className="charity-pagination-row">
          <span className="charity-pagination-text">
            Вы находитесь на <span>{currentPage}</span> странице из {this.state.pagesCount}
          </span>
        </div>
        <div className="charity-pagination-row">
          <button
            className="charity-pagination-btn btn-arrow charity-pagination-btn-left"
            onClick={() => this.handlePageChange(currentPage-1)}
          >
            <div className="arrow-wrapper">
              <div className="arrow-divider" />
            </div>
          </button>
          <button
            className="charity-pagination-btn btn-arrow charity-pagination-btn-right"
            onClick={() => this.handlePageChange(currentPage+1)}
          >
            <div className="arrow-wrapper">
              <div className="arrow-divider" />
            </div>
          </button>
        </div>
      </div>
    );
  }
};

CharityPagination.propTypes = {
    className: PropTypes.string,
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
}

export default CharityPagination;
