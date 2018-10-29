import React, { Component } from "react";
import "./EduWayPeopleControlBar.css";
import CharityPagination from "../CharityPagination/CharityPagination";
import TabsBar from "../TabsBar/TabsBar";

class EduWayPeopleControlBar extends Component {
  render() {
    const {
      itemsCount,
      pageSize,
      onPageChange,
      currentPage,
      onTabSelect,
      tabList,
      selectedTab
    } = this.props;
    return (
      <div className="edu-way-people-bar">
        <TabsBar
          className="edu-way-bar-column"
          tabList={tabList}
          onTabSelect={onTabSelect}
          selectedTab={selectedTab}
        />
        {itemsCount > 0 && (
          <CharityPagination
            className="edu-way-bar-column second"
            itemsCount={itemsCount}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
        )}
      </div>
    );
  }
}

export default EduWayPeopleControlBar;
