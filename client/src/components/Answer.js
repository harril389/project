import React, { useState } from "react";
import CheckBox from "./Form/CheckBox";
import Radio from "./Form/RadioButton";
import { LangConst } from "const";
import { Storage } from "api/storage";

const MultiAnswer = props => {
  const { data, index, onClick } = props;

  const [click, setClick] = useState(false);

  const onChangeRadio = index => {
    let data = index.split("---");
    let dataStorage = Storage.getStorage("dataAnswer");
    if (!dataStorage) {
      let dataQuestion = [{ question_uid: data[0], answers: [{ uid: data[1] }] }];
      Storage.setStorage("dataAnswer", { data: dataQuestion });
    } else {
      let newData = dataStorage.data;
      let value = checkQuestionExist(newData, data[0]);
      if (value === -1) {
        newData.push({ question_uid: data[0], answers: [{ uid: data[1] }] });
        Storage.setStorage("dataAnswer", { data: newData });
      } else {
        newData[value].answers = [{ uid: data[1] }];
        Storage.setStorage("dataAnswer", { data: newData });
      }
    }
    onClick();
    setClick(!click);
  };

  const onChangeCheckBox = index => {
    let data = index.split("---");
    let dataStorage = Storage.getStorage("dataAnswer");
    if (!dataStorage) {
      let dataQuestion = [{ question_uid: data[0], answers: [{ uid: data[1] }] }];
      Storage.setStorage("dataAnswer", { data: dataQuestion });
    } else {
      let newData = dataStorage.data;
      let value = checkQuestionExist(newData, data[0]);
      if (value === -1) {
        newData.push({ question_uid: data[0], answers: [{ uid: data[1] }] });
        Storage.setStorage("dataAnswer", { data: newData });
      } else {
        let indexAnswer = checkAnswerExist(newData[value].answers, data[1]);
        if (indexAnswer === -1) {
          newData[value].answers.push({ uid: data[1] });
          Storage.setStorage("dataAnswer", { data: newData });
        } else {
          newData[value].answers.splice(indexAnswer, 1);
          Storage.setStorage("dataAnswer", { data: newData });
        }
      }
    }
    onClick();
    setClick(!click);
  };

  const checkDefaultAnswer = (question, answer) => {
    let data = Storage.getStorage("dataAnswer");
    if (!data) {
      return false;
    } else {
      let checkData = data.data;
      let questionIndex = checkData.findIndex(element => element.question_uid === question);
      if (questionIndex === -1) {
        return false;
      } else {
        if (checkData[questionIndex]?.answers) {
          let result = checkData[questionIndex]?.answers.findIndex(element => element.uid === answer);
          return result === -1 ? false : true;
        }
      }
    }
  };

  return (
    <div className="member-answer">
      <div className="question regular-md-txt">
        {LangConst.TXT_INDEX_QUESTION} {index + 1}: {data?.question_text}
      </div>
      <div className="results">
        {data?.results &&
          data?.results.length > 0 &&
          data?.results.map(answer =>
            data.is_many_correct ? (
              <div className="answer" key={answer.uid}>
                <CheckBox
                  name={data.uid}
                  onInput={index => onChangeCheckBox(index)}
                  uid={answer.uid}
                  value={data.uid + "---" + answer.uid}
                  content={answer.content}
                  checked={checkDefaultAnswer(data.uid, answer?.uid)}
                />
              </div>
            ) : (
              <div className="answer" key={answer.uid}>
                <Radio
                  name={data.uid}
                  onInput={index => onChangeRadio(index)}
                  uid={answer.uid}
                  value={data.uid + "---" + answer.uid}
                  content={answer.content}
                  checked={checkDefaultAnswer(data.uid, answer?.uid)}
                />
              </div>
            ),
          )}
      </div>
    </div>
  );
};

const checkQuestionExist = (data, question) => {
  let result = data.findIndex(element => element.question_uid === question);
  return result;
};

const checkAnswerExist = (data, answer) => {
  let result = data.findIndex(element => element.uid === answer);
  return result;
};

export default MultiAnswer;
