import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ExamAdminAction from "redux/examAdmin.redux";
import SubmitForm from "./SubmitForm";

const FormExam = props => {
  const { uid, isUpdate } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUpdate) {
      dispatch(
        ExamAdminAction.getExamByUid({
          uid: uid,
        }),
      );
    }
  }, []);

  return (
    <div className="para-form-exam">
      <SubmitForm id={uid} isUpdate={isUpdate} />
    </div>
  );
};

FormExam.defaultProps = {
  isUpdate: false,
};

export default FormExam;
