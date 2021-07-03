import React from "react";
import { LangConst } from "const";

const InformationBranch = props => {
  const { data } = props;

  return (
    <div className="para-information-unit">
      <div className="header-unit">
        <div className="medium-xl-txt">{data?.name_branch}</div>
      </div>

      <div className="body-unit">
        <div className="content-unit">
          <div className="label-unit medium-md-txt">{LangConst.TXT_CODE_UNIT}:</div>
          <div className="value-unit medium-md-txt">{data?.code_branch}</div>
        </div>
        <div className="content-unit">
          <div className="label-unit medium-md-txt">{LangConst.TXT_ADDRESS}:</div>
          <div className="value-unit medium-md-txt">{data?.address}</div>
        </div>
        <div className="content-unit">
          <div className="label-unit medium-md-txt">{LangConst.TXT_MANAGEMENT_UNIT}:</div>
          <div className="value-unit medium-md-txt">{data?.management_unit}</div>
        </div>
        <div className="content-unit">
          <div className="label-unit medium-md-txt">{LangConst.TXT_MANAGER}:</div>
          <div className="value-unit medium-md-txt">{data?.manager}</div>
        </div>
        <div className="content-unit">
          <div className="label-unit medium-md-txt">{LangConst.TXT_FOUNDED_DAY}:</div>
          <div className="value-unit medium-md-txt">{data?.founded_day}</div>
        </div>
        <div className="content-unit">
          <div className="label-unit medium-md-txt">{LangConst.TXT_TRADITIONAL_DAY}:</div>
          <div className="value-unit medium-md-txt">{data?.traditional_day}</div>
        </div>
        <div className="content-unit">
          <div className="label-unit medium-md-txt">{LangConst.TXT_NEWBIE}:</div>
          <div className="value-unit medium-md-txt">{data?.sympathizer}</div>
        </div>
        <div className="content-unit">
          <div className="label-unit medium-md-txt">{LangConst.TXT_VOLUNTEER}:</div>
          <div className="value-unit medium-md-txt">{data?.volunteer}</div>
        </div>
        <div className="content-unit">
          <div className="label-unit medium-md-txt">{LangConst.TXT_MEMBER}:</div>
          <div className="value-unit medium-md-txt">{data?.member}</div>
        </div>
        <div className="content-unit">
          <div className="label-unit medium-md-txt">{LangConst.TXT_STAFF_STRENGTHENED}:</div>
          <div className="value-unit medium-md-txt">{data?.staff_strengthened}</div>
        </div>
        <div className="content-unit">
          <div className="label-unit medium-md-txt">{LangConst.TXT_COACH}:</div>
          <div className="value-unit medium-md-txt">{data?.coach}</div>
        </div>
        <div className="content-unit">
          <div className="label-unit medium-md-txt">{LangConst.TXT_INSTRUCTOR}:</div>
          <div className="value-unit medium-md-txt">{data?.instructor}</div>
        </div>
      </div>
    </div>
  );
};
export default InformationBranch;
