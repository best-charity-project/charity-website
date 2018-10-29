import React, { Component } from "react";

class TableHeader extends Component {
  state = {};
  render() {
    const { headerClassName, columnsClassName, columns } = this.props;
    return (
      <div className={headerClassName + " table-header"}>
        {columns.map((column, index) => (
          <div
            key={index}
            className={
              columnsClassName + " " + column.className + " table-column"
            }
          >
            {column.label}
          </div>
        ))}
      </div>
    );
  }
}

export default TableHeader;
