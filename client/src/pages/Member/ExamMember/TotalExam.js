import React, { useEffect } from "react";
import { MainLayout } from "layouts";
import { WaitingExam, Toast } from "components";
import ExamUserAction from "redux/examUser.redux";
import { useSelector, useDispatch } from "react-redux";
import { ErrorSVG } from "theme/icons";

const TotalExam = () => {
  const dispatch = useDispatch();

  const data = useSelector(state => state.examUserRedux?.data);
  const errorCheckPass = useSelector(state => state.examUserRedux?.errorCheckPass);
  const isGetPassFailure = useSelector(state => state.examUserRedux?.isGetPassFailure);

  useEffect(() => {
    if (!data) {
      dispatch(
        ExamUserAction.getListExamUser({
          paging: 0,
          size: 10,
          page: 1,
          name_exam_filter: "",
        }),
      );
    }
  }, [data]);

  const onCheck = () => {
    dispatch(ExamUserAction.examUserSuccess({ errorCheckPass: null, isGetPassFailure: false }));
  };

  return (
    <MainLayout name={"Kiểm tra"}>
      <div className="para-member-total-exam">
        {isGetPassFailure && errorCheckPass?.message !== "OK" && (
          <Toast
            title={<ErrorSVG width="50px" height="50px" color="red" />}
            message={errorCheckPass?.message}
            onChange={onCheck}
          />
        )}
        {data?.data?.length > 0 && data?.data.map(exam => <WaitingExam key={exam.uid} data={exam} />)}
      </div>
    </MainLayout>
  );
};

export default TotalExam;
