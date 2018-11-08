import React from "react";
import "./EduWayPeopleControlBar.css";
import CharityPagination from "../Common/CharityPagination/CharityPagination";
import TabsBar from "../TabsBar/TabsBar";

const EduWayPeopleControlBar = ({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,
  onTabSelect,
  tabList,
  selectedTab
}) => {
  return (
    <div className="edu-way-people-bar">
      <TabsBar
        className="edu-way-bar-column"
        tabList={tabList}
        onTabSelect={onTabSelect}
        selectedTab={selectedTab}
        disabled={itemsCount === 0}
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
};

export default EduWayPeopleControlBar;
