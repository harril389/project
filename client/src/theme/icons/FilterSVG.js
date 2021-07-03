import React from "react";

const FilterSVG = props => {
  const { width, height } = props;

  return (
    <div style={{ display: "flex" }}>
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 16" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11 1C12.3062 1 13.4175 1.83481 13.8293 3L15 3C15.5523 3 16 3.44772 16 4C16 4.55229 15.5523 5 15 5H13.8293C13.4175 6.16519 12.3062 7 11 7C9.69378 7 8.58254 6.16519 8.17071 5L1 5C0.447716 5 0 4.55228 0 4C0 3.44771 0.447716 3 1 3L8.17071 3C8.58254 1.83481 9.69378 1 11 1ZM11 3C10.4477 3 10 3.44772 10 4C10 4.55228 10.4477 5 11 5C11.5523 5 12 4.55228 12 4C12 3.44772 11.5523 3 11 3Z"
          fill="#00000033"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15 11C15.5523 11 16 11.4477 16 12C16 12.5523 15.5523 13 15 13H7.82929C7.41746 14.1652 6.30622 15 5 15C3.69378 15 2.58254 14.1652 2.17071 13H1C0.447716 13 0 12.5523 0 12C0 11.4477 0.447716 11 1 11H2.17071C2.58254 9.83481 3.69378 9 5 9C6.30622 9 7.41746 9.83481 7.82929 11H15ZM4 12C4 11.4477 4.44772 11 5 11C5.55228 11 6 11.4477 6 12C6 12.5523 5.55228 13 5 13C4.44772 13 4 12.5523 4 12Z"
          fill="#00000033"
        />
      </svg>
    </div>
  );
};
FilterSVG.defaultProps = {
  width: "16px",
  height: "16px",
};

export default FilterSVG;
