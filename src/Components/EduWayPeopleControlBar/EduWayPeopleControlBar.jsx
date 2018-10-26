import React, { Component } from "react";
import "./EduWayPeopleControlBar.css";
import CharityPagination from "../CharityPagination/CharityPagination";

class EduWayPeopleControlBar extends Component {
  render() {
    const { itemsCount, pageSize, onPageChange, currentPage } = this.props;
    return (
      <div className="edu-way-people-bar">
        <div className="edu-way-bar-column">
          <button className="edu-way-bar-btn btn-all">Все</button>
          <button className="edu-way-bar-btn btn-new">Новые запросы</button>
        </div>
        {itemsCount > 0 && <CharityPagination
          className="edu-way-bar-column second"
          itemsCount={itemsCount}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />}
      </div>
    );
  }
}

export default EduWayPeopleControlBar;
