import React, { useState } from "react";
import { FilterSVG } from "theme/icons";

const Filter = props => {
  const { title, children, padding } = props;

  const [open, setOpen] = useState(false);

  return (
    <div className="para-filter">
      <button className="button" type="button" style={{ padding: padding }} onClick={() => setOpen(!open)}>
        <p className="semiBold-md-txt">{title}</p>
        <FilterSVG />
      </button>
      <div className="main" style={{ display: open ? "flex" : "none" }}>
        {children}
      </div>
    </div>
  );
};

Filter.defaultProps = {
  title: "",
  padding: "10px 15px",
};

export default Filter;
