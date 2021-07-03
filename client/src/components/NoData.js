import React from "react";
import { LangConst } from "const";
import { FolderSVG } from "theme/icons";

const NoData = () => {
  return (
    <div className="para-no-data">
      <div className="icon-no-data">
        <FolderSVG width="100px" height="100px" color="rgba(0,0,0,0.2)" />
      </div>
      <div className="message-no-data regular-lg-txt">{LangConst.TXT_NO_DATA}</div>
    </div>
  );
};

export default NoData;
