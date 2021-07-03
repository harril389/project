import React, { useState, useEffect } from "react";
import { MainLayout } from "layouts";
import { Answer, Button } from "components";
import { useDispatch, useSelector } from "react-redux";
import ExamUserAction from "redux/examUser.redux";
import { Storage } from "api/storage";
import { PathConst } from "const";
import { withRouter } from "react-router-dom";

const ExamMember = props => {
  const dispatch = useDispatch();
  const postAnswerSuccess = useSelector(state => state.examUserRedux?.postAnswerSuccess);

  const dataStorage = Storage.getStorage("dataExam");
  const dataAnswer = Storage.getStorage("dataAnswer");
  Storage.getStorage("TimeExam");

  const [click, setClick] = useState(false);

  const onChange = () => {
    setClick(!click);
  };

  const onSubmit = () => {
    const data = Storage.getStorage("dataAnswer");
    const uid = Storage.getStorage("TimeExam");

    if (data && uid) {
      dispatch(
        ExamUserAction.createAnswer({
          uid: uid.uid,
          questions: data.data,
        }),
      );
    }
    dispatch(
      ExamUserAction.examUserSuccess({
        getPassSuccess: false,
      }),
    );
    Storage.removeStorage("dataAnswer");
    Storage.removeStorage("dataExam");
    Storage.removeStorage("TimeExam");
    props.history.push(PathConst.TOTAL_EXAM);
  };
  // Storage.removeStorage("dataAnswer");
  // Storage.removeStorage("dataExam");
  // Storage.removeStorage("TimeExam");
  useEffect(() => {
    if (postAnswerSuccess === true) {
      dispatch(
        ExamUserAction.examUserSuccess({
          getPassSuccess: false,
        }),
      );
      Storage.removeStorage("dataAnswer");
      Storage.removeStorage("dataExam");
      Storage.removeStorage("TimeExam");
      props.history.push(PathConst.TOTAL_EXAM);
    }
  }, [postAnswerSuccess]);

  return (
    <MainLayout name={"Kiểm tra"}>
      <div className="para-member-exam">
        <div className="box-exam">
          {dataStorage &&
            dataStorage?.data.length > 0 &&
            dataStorage?.data.map((question, index) => (
              <div key={question.uid} id={"question" + question.uid}>
                <Answer data={question} index={index} dataStorage={dataStorage?.data} onClick={onChange} />
              </div>
            ))}
        </div>
        <div className="box-control">
          <div className="box-toolbar">
            <div className="control">
              {dataStorage &&
                dataStorage?.data.length > 0 &&
                dataStorage?.data.map((question, index) => (
                  <a
                    className={`link ${checkQuestionExist(dataAnswer, question.uid) ? "link-btn" : ""}`}
                    key={"control" + question.uid}
                    href={"#question" + question.uid}
                  >
                    {index + 1}
                  </a>
                ))}
            </div>
            <div className="footer-toolbar">
              <CountDown totalTime={convertTimeExam()} />
              <Button type="button" name="submit" onClick={onSubmit} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const checkQuestionExist = (data, question) => {
  if (!data) {
    return false;
  } else {
    let result = data.data.findIndex(element => element.question_uid === question);
    if (result === -1) {
      return false;
    } else {
      return data.data[result].answers.length > 0 ? true : false;
    }
  }
};

const convertTimeExam = () => {
  const timeExam = Storage.getStorage("TimeExam");
  if (timeExam) {
    let timeRemaining = Math.round((timeExam.data - Date.now()) / 1000);
    let seconds = timeRemaining % 60;
    let minutes = Math.floor(timeRemaining / 60);
    let hours = 0;
    if (minutes > 60) {
      hours = Math.floor(minutes / 60);
    }
    console.log(timeExam.data);
    console.log({ hours: hours, minutes: minutes, seconds: seconds });
    return { hours: hours, minutes: minutes, seconds: seconds };
  }
};

const CountDown = props => {
  const { totalTime } = props;
  const [hours, setHours] = useState(totalTime?.hours || 0);
  const [minutes, setMinutes] = useState(totalTime?.minutes || 0);
  const [seconds, setSeconds] = useState(totalTime?.seconds || 0);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if (hours === 0) {
            clearInterval(myInterval);
            Storage.removeStorage("dataAnswer");
            Storage.removeStorage("dataExam");
            Storage.removeStorage("TimeExam");
            alert("Time out");
          } else {
            setHours(hours - 1);
            setMinutes(59);
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div className="time-exam">
      <div id="h" className="countdown regular-md-txt">
        {hours}
      </div>
      {":"}
      <div id="m" className="countdown regular-md-txt">
        {minutes}
      </div>
      {":"}
      <div id="s" className="countdown regular-md-txt">
        {seconds}
      </div>
    </div>
  );
};

export default withRouter(ExamMember);
