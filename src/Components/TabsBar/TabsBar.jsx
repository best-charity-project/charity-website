import React, { Component } from "react";
import "./TabsBar.css";

class TabsBar extends Component {
  render() {
    const {
      className,
      onTabSelect,
      tabList,
      textProperty,
      keyProperty,
      selectedTab,
      disabled
    } = this.props;
    return (
      <div className={className + " tabs-bar"}>
        {tabList.map(tab => (
          <button
            disabled={disabled}
            className={
              tab === selectedTab
                ? "tabs-bar-btn btn-all active"
                : "tabs-bar-btn btn-all"
            }
            key={tab[keyProperty]}
            onClick={() => onTabSelect(tab)}
          >
            {tab[textProperty]}
          </button>
        ))}
      </div>
    );
  }
}

TabsBar.defaultProps = {
  textProperty: "name",
  keyProperty: "_id"
};

export default TabsBar;
