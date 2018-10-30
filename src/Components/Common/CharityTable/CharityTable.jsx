import React from "react";
import "./CharityTable.css";
import CharityTableHeader from "./CharityTableHeader";
import CharityTableBody from "./CharityTableBody";

const CharityTable = ({
  tableClassName,
  headerClassName,
  bodyClassName,
  columnsClassName,
  columns,
  items
}) => {
  return (
    <div className={"charity-table " + tableClassName}>
      <CharityTableHeader
        headerClassName={
          "charity-table-header charity-table-row " + headerClassName
        }
        columnsClassName={"charity-table-column " + columnsClassName}
        columns={columns}
      />
      <CharityTableBody
        bodyClassName={"charity-table-body charity-table-row " + bodyClassName}
        columnsClassName={"charity-table-column " + columnsClassName}
        columns={columns}
        items={items}
      />
    </div>
  );
};

export default CharityTable;
