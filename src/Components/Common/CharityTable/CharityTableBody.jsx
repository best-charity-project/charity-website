import React, { Component } from "react";

class CharityTableBody extends Component {
  render() {
    const {
      bodyClassName,
      columnsClassName,
      columns,
      items
    } = this.props;

    return (
      <React.Fragment>
        {items.map((item, index) => (
          <div className={bodyClassName} key={index}>
            {columns.map((column, columnIndex) => (
              <div key={columnIndex} className={columnsClassName + " " + column.className}>
                { column.isArray ? (item[column.propertyName].map((subItem, subIndex) => (
                  <div key={subIndex}>{subItem}</div>
                ))) : (item[column.propertyName])}
              </div>
            ))}
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default CharityTableBody;
