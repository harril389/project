import React from "react";
import { MainLayout } from "layouts";
import { Link } from "react-router-dom";
import { PathConst } from "const";
import { checkPath } from "utils";

const LayoutUnit = props => {
  const { children, currentPath, header, totalBranch, totalClub, title } = props;

  return (
    <MainLayout name={title}>
      <div className="para-admin-unit">
        <div className="header">
          <div className="header-left">
            <Link
              to={PathConst.ADMIN_MANAGE_GROUP}
              className={`button semiBold-lg-txt ${
                checkPath(currentPath, PathConst.ADMIN_MANAGE_GROUP) && "btn-color"
              }`}
            >
              Hội
            </Link>
            <Link
              to={PathConst.ADMIN_MANAGE_BRANCH}
              className={`button semiBold-lg-txt ${
                checkPath(currentPath, PathConst.ADMIN_MANAGE_BRANCH) && "btn-color"
              }`}
            >
              Chi Hội
              {totalBranch && (
                <div className={`total ${checkPath(currentPath, PathConst.ADMIN_MANAGE_BRANCH) && "btn-back-color"}`}>
                  {totalBranch}
                </div>
              )}
            </Link>
            <Link
              to={PathConst.ADMIN_MANAGE_CLUB}
              className={`button semiBold-lg-txt ${checkPath(currentPath, PathConst.ADMIN_MANAGE_CLUB) && "btn-color"}`}
            >
              Đội
              {totalClub && (
                <div className={`total ${checkPath(currentPath, PathConst.ADMIN_MANAGE_CLUB) && "btn-back-color"}`}>
                  {totalClub}
                </div>
              )}
            </Link>
          </div>
          <div className="header-right">{header}</div>
        </div>
        <div className="main">{children}</div>
      </div>
    </MainLayout>
  );
};

LayoutUnit.defaultProps = {
  totalBranch: "",
  totalClub: "",
};
export default LayoutUnit;
