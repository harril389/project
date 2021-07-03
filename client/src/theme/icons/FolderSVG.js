import React from "react";

const FolderSVG = props => {
  const { width, height, color } = props;
  return (
    <div>
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="far"
        data-icon="folder"
        className="svg-inline--fa fa-folder fa-w-16"
        role="img"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        style={{ color: color }}
      >
        <path
          fill="currentColor"
          d="M464 128H272l-54.63-54.63c-6-6-14.14-9.37-22.63-9.37H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V176c0-26.51-21.49-48-48-48zm0 272H48V112h140.12l54.63 54.63c6 6 14.14 9.37 22.63 9.37H464v224z"
        ></path>
      </svg>
    </div>
  );
};

FolderSVG.defaultProps = {
  width: "20px",
  height: "20px",
  color: "rgba(0,0,0,0.65)",
};

export default FolderSVG;
