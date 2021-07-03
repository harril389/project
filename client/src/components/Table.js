import React from "react";

const Table = props => {
  const { body, header } = props;
  return (
    <div className="para-table">
      <table className="table">
        {header}
        {body}
      </table>
    </div>
  );
};
export default Table;

export const TableCell = ({ width, align, children }) => {
  return (
    <td style={{ width: width }}>
      <div className="td-info" style={{ textAlign: align }}>
        {children}
      </div>
    </td>
  );
};

export const TableRow = ({ children }) => {
  return <tr>{children}</tr>;
};

export const TableColumn = ({ width, align, children }) => {
  return (
    <th style={{ width: width }}>
      <div className="th-info" style={{ display: "flex", justifyContent: align }}>
        {children}
      </div>
    </th>
  );
};

TableColumn.defaultProps = {
  align: "center",
};

export const TableHeader = ({ children }) => {
  return <thead>{children}</thead>;
};

export const TableBody = ({ children }) => {
  return <tbody>{children}</tbody>;
};
