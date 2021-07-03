import React, { useState, useEffect } from "react";
import { PathConst, LangConst } from "const";
import { DialogForm } from "components";
import { withRouter } from "react-router-dom";
import { InputText } from "../Form/Input";
import { LockSVG } from "theme/icons";
import { convertTime } from "utils";
import { useSelector, useDispatch } from "react-redux";
import ExamUserAction from "redux/examUser.redux";
import { Storage } from "api/storage";

const WaitingExam = props => {
  const { data } = props;
  const dispatch = useDispatch();

  const dataExam = useSelector(state => state.examUserRedux?.dataExam);
  const getPassSuccess = useSelector(state => state.examUserRedux?.getPassSuccess);

  const [pass, setPass] = useState("");

  const onChange = (name, value) => {
    setPass(value);
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(
      ExamUserAction.checkPass({
        exam_uid: data?.uid,
        password: pass,
      }),
    );
  };

  useEffect(() => {
    if (getPassSuccess === true) {
      if (!Storage.getStorage("dataExam")) {
        Storage.setStorage("dataExam", { data: dataExam?.questions });
        let dataAnswer = [];
        dataExam?.questions.map(async element => dataAnswer.push({ question_uid: element.uid, answers: [] }));
        Storage.setStorage("dataAnswer", { data: dataAnswer });
        Storage.setStorage("TimeExam", { data: Date.now() + data?.time * 1000, uid: dataExam?.uid });
      }
      props.history.push(PathConst.EXAM_BLOOD);
    }
  }, [getPassSuccess]);

  return (
    <div className="waiting-exam">
      <div className="header">
        <div className="medium-xl-txt">{data?.name}</div>
        <div className="regular-md-txt">
          {LangConst.TXT_START_TIME}: {convertTime(data?.start_time * 1000)}
        </div>
        <div className="regular-md-txt">
          {LangConst.TXT_END_TIME}: {convertTime(data?.end_time * 1000)}
        </div>
        <div className="regular-md-txt">
          {LangConst.TXT_TIME}: {data.time / 60} {LangConst.TXT_MINUTES}
        </div>
        <div className="regular-md-txt">
          {LangConst.TXT_DESCRIPTION}: {data?.description}
        </div>
      </div>
      {data?.status === 1 && (
        <div className="footer">
          <DialogForm
            title={LangConst.TXT_INPUT_PASSWORD}
            name={LangConst.TXT_INPUT_PASSWORD}
            content={
              <form onSubmit={onSubmit}>
                <InputText
                  checkText={false}
                  icon={<LockSVG />}
                  notification="Nhập pass!"
                  placeHolder={LangConst.TXT_INPUT_PASSWORD_EXAM}
                  name="password"
                  type="text"
                  defaultValue=""
                  onInput={(nameText, value) => onChange(nameText, value)}
                />
                <div className="dialog-footer-form">
                  <button className="button-footer-form" type="submit">
                    {LangConst.TXT_CONFIRM}
                  </button>
                </div>
              </form>
            }
          />
        </div>
      )}
    </div>
  );
};

export default withRouter(WaitingExam);
