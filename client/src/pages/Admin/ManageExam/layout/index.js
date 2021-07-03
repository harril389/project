import React from "react";
import { MainLayout } from "layouts";
import { Link } from "react-router-dom";
import { PathConst } from "const";
import { checkPath } from "utils";

const LayoutExam = props => {
  const { children, currentPath, header, totalTypeQuestion, totalExam, totalQuestion, totalAnalysis, title } = props;

  return (
    <MainLayout name={title}>
      <div className="para-manage-exam">
        <div className="header">
          <div className="header-left">
            <Link
              to={PathConst.ADMIN_MANAGE_EXAM}
              className={`button semiBold-lg-txt ${checkPath(currentPath, PathConst.ADMIN_MANAGE_EXAM) && "btn-color"}`}
            >
              Đề thi
              {totalExam && (
                <div className={`total ${checkPath(currentPath, PathConst.ADMIN_MANAGE_EXAM) && "btn-back-color"}`}>
                  {totalExam}
                </div>
              )}
            </Link>
            <Link
              to={PathConst.ADMIN_MANAGE_QUESTION}
              className={`button semiBold-lg-txt ${
                checkPath(currentPath, PathConst.ADMIN_MANAGE_QUESTION) && "btn-color"
              }`}
            >
              Câu hỏi
              {totalQuestion && (
                <div className={`total ${checkPath(currentPath, PathConst.ADMIN_MANAGE_QUESTION) && "btn-back-color"}`}>
                  {totalQuestion}
                </div>
              )}
            </Link>
            <Link
              to={PathConst.ADMIN_MANAGE_ANALYSIS}
              className={`button semiBold-lg-txt ${
                checkPath(currentPath, PathConst.ADMIN_MANAGE_ANALYSIS) && "btn-color"
              }`}
            >
              Thống kê kết quả
              {totalAnalysis && (
                <div className={`total ${checkPath(currentPath, PathConst.ADMIN_MANAGE_ANALYSIS) && "btn-back-color"}`}>
                  {totalAnalysis}
                </div>
              )}
            </Link>
            <Link
              to={PathConst.ADMIN_MANAGE_TYPE_QUESTION}
              className={`button semiBold-lg-txt ${
                checkPath(currentPath, PathConst.ADMIN_MANAGE_TYPE_QUESTION) && "btn-color"
              }`}
            >
              Loại câu hỏi
              {totalTypeQuestion && (
                <div
                  className={`total ${
                    checkPath(currentPath, PathConst.ADMIN_MANAGE_TYPE_QUESTION) && "btn-back-color"
                  }`}
                >
                  {totalTypeQuestion}
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

LayoutExam.defaultProps = {
  totalTypeQuestion: "",
  totalExam: "",
  totalQuestion: "",
  totalAnalysis: "",
};
export default LayoutExam;
