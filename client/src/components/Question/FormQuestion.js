import React, { useState } from "react";
import Input from "../Form/Input";
import Button, { ButtonIcon } from "../Button";
import Radio from "../Form/RadioButton";
import CheckBox from "../Form/CheckBox";
import { SelectOption } from "../Selected";
import { TrashSVG, AddSVG } from "theme/icons";
import { uuid } from "utils";
import { LangConst } from "const";
import { useDispatch } from "react-redux";
import QuestionAction from "redux/question.redux";

export const QuestionOneAnswer = props => {
  const { question, typeQuestion, update } = props;
  const [data, setData] = useState({ ...question, type_question_uid: question.type_question?.uid });

  const dispatch = useDispatch();

  const onChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const onChangeAnswer = (index, value) => {
    let customData = data.results;
    customData[index].content = value;
    setData({ ...data, results: customData });
  };

  const onChangeRadio = index => {
    let customData = data.results;
    for (let i = 0; i < customData.length; i++) {
      if (customData[i].is_result === true) {
        customData[i].is_result = false;
        break;
      }
    }
    customData[index].is_result = true;
    setData({ ...data, results: customData });
  };

  const onCreate = e => {
    e.preventDefault();
    if (!data.question_text) {
      alert("Chưa nhập câu hỏi");
    } else if (!data.point) {
      alert("Chưa nhập điểm");
    } else if (parseInt(data.point) <= 0) {
      alert("Điểm phải lớn hơn 0");
    } else if (!data.type_question_uid) {
      alert("Chưa chon type question");
    } else {
      let checkResult = data.results.find(e => e.content === "");
      if (!checkResult) {
        delete data.type_question;
        dispatch(
          QuestionAction.createQuestion({
            data: data,
          }),
        );
      } else {
        alert("Chưa điền đáp án đúng");
      }
    }
  };

  const onUpdate = e => {
    e.preventDefault();
    if (!data.question_text) {
      alert("Chưa nhập câu hỏi");
    } else if (!data.point) {
      alert("Chưa nhập điểm");
    } else if (parseInt(data.point) <= 0) {
      alert("Điểm phải lớn hơn 0");
    } else if (!data.type_question_uid) {
      alert("Chưa chon type question");
    } else {
      let checkResult = data.results.find(e => e.content === "");
      if (!checkResult) {
        delete data.type_question;
        dispatch(
          QuestionAction.updateQuestion({
            data: data,
          }),
        );
      } else {
        alert("Chưa điền đáp án đúng");
      }
    }
  };

  return (
    <div className="para-type-question">
      <div className="title semiBold-lg-txt">Câu hỏi 1 đáp án</div>
      <form className="main" onSubmit={update ? onUpdate : onCreate}>
        <div className="form">
          <Input
            label="Câu hỏi"
            placeHolder="Nhập câu hỏi..."
            name="question_text"
            uuid={data?.uid || "question"}
            type="text"
            defaultValue={data?.question_text}
            onInput={(nameText, value) => onChange(nameText, value)}
            requiredInput={true}
          />
          <Input
            label="Điểm"
            placeHolder="Nhập điểm..."
            name="point"
            uuid={data?.uid + "-point" || "point"}
            type="number"
            defaultValue={data?.point}
            onInput={(nameText, value) => onChange(nameText, value)}
            requiredInput={true}
          />
          {data?.results.map((answer, index) => (
            <div key={answer?.uid} className="details">
              <div className="radio">
                <Radio
                  name="question"
                  value={index}
                  onInput={index => onChangeRadio(index)}
                  requiredInput={true}
                  checked={answer?.is_result}
                />
              </div>
              <div className="answer">
                <Input
                  label={`Đáp án ${index + 1}`}
                  placeHolder={`Nhập đáp án ${index + 1}...`}
                  name={index}
                  uuid={answer?.uid}
                  type="text"
                  defaultValue={answer?.content}
                  onInput={(index, value) => onChangeAnswer(index, value)}
                  requiredInput={true}
                />
              </div>
            </div>
          ))}
          <div className="option">
            {typeQuestion?.data.length > 0 && (
              <SelectOption
                width="170px"
                defaultValue={data.type_question?.type || LangConst.TXT_CHOOSE_TYPE_QUESTION}
                listOption={typeQuestion?.data}
                nameText="type_question_uid"
                onInput={(nameText, value) => onChange(nameText, value)}
              />
            )}
          </div>
        </div>
        <div className="footer">
          <Button type="submit" name="submit" />
        </div>
      </form>
    </div>
  );
};

QuestionOneAnswer.defaultProps = {
  question: {
    question_text: "",
    results: [
      {
        uid: uuid(),
        content: "",
        is_result: false,
      },
      {
        uid: uuid(),
        content: "",
        is_result: false,
      },
      {
        uid: uuid(),
        content: "",
        is_result: false,
      },
      {
        uid: uuid(),
        content: "",
        is_result: false,
      },
    ],
    point: "",
    type_question_uid: "",
  },
  update: false,
};

export const QuestionMultiAnswer = props => {
  const { question, typeQuestion, update } = props;
  const [data, setData] = useState({ ...question, type_question_uid: question.type_question?.uid });

  const dispatch = useDispatch();

  const onChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const onChangeAnswer = (index, value) => {
    let customData = [...data.results];
    customData[index].content = value;
    setData({ ...data, results: customData });
  };

  const onChangeCheckBox = index => {
    let customData = [...data.results];
    customData[index].is_result = !customData[index].is_result;
    setData({ ...data, results: customData });
  };

  const deleteAnswer = index => {
    let customData = [...data.results];
    customData.splice(index, 1);
    setData({ ...data, results: customData });
  };

  const addAnswer = () => {
    let customData = [...data.results];
    customData.push({
      uid: uuid(),
      content: "",
      is_result: false,
    });
    setData({ ...data, results: customData });
  };

  const onCreate = e => {
    e.preventDefault();
    if (!data.question_text) {
      alert("Chưa nhập câu hỏi");
    } else if (!data.point) {
      alert("point null");
    } else if (parseInt(data.point) <= 0) {
      alert("Điểm phải lớn hơn 0");
    } else if (!data.type_question_uid) {
      alert("Chưa chọn type question");
    } else {
      let checkResult = data.results.find(e => e.is_result === true);
      if (!checkResult) {
        alert("Chưa chọn đáp án đúng");
      } else {
        delete data.type_question;
        console.log("create");
        dispatch(
          QuestionAction.createQuestion({
            data: data,
          }),
        );
        console.log(data);
      }
    }
  };

  const onUpdate = e => {
    e.preventDefault();
    if (!data.question_text) {
      alert("Chưa nhập câu hỏi");
    } else if (!data.point) {
      alert("point null");
    } else if (parseInt(data.point) <= 0) {
      alert("Điểm phải lớn hơn 0");
    } else if (!data.type_question_uid) {
      alert("Chưa chọn type question");
    } else {
      let checkResult = data.results.find(e => e.is_result === true);
      if (!checkResult) {
        alert("Chưa chọn đáp án đúng");
      } else {
        delete data.type_question;
        dispatch(
          QuestionAction.updateQuestion({
            data: data,
          }),
        );
        console.log(data);
      }
    }
  };

  return (
    <div className="para-type-question">
      <div className="title semiBold-lg-txt">Câu hỏi nhiều đáp án</div>
      <form className="main" onSubmit={update ? onUpdate : onCreate}>
        <div className="form">
          <Input
            label="Câu hỏi"
            placeHolder="Nhập câu hỏi..."
            name="question_text"
            uuid={data?.uid || "question"}
            type="text"
            defaultValue={data?.question_text}
            onInput={(nameText, value) => onChange(nameText, value)}
            requiredInput={true}
          />
          <Input
            label="Điểm"
            placeHolder="Nhập điểm..."
            name="point"
            uuid={data?.uid + "-point" || "point"}
            type="number"
            defaultValue={data?.point}
            onInput={(nameText, value) => onChange(nameText, value)}
            requiredInput={true}
          />
          {data?.results.map((answer, index) => (
            <div key={answer.uid} className="details">
              <div className="radio">
                <CheckBox
                  name="question"
                  value={index}
                  onInput={index => onChangeCheckBox(index)}
                  checked={answer?.is_result}
                />
              </div>
              <div className="answer">
                <Input
                  label={`Đáp án ${index + 1}`}
                  placeHolder={`Nhập đáp án ${index + 1}...`}
                  name={index}
                  uuid={answer?.uid}
                  type="text"
                  defaultValue={answer?.content}
                  onInput={(index, value) => onChangeAnswer(index, value)}
                  requiredInput={true}
                />
              </div>
              <div className="radio">
                <ButtonIcon type="button" icon={<TrashSVG />} value={index} onInput={value => deleteAnswer(value)} />
              </div>
            </div>
          ))}
          <div className="option">
            <ButtonIcon type="button" icon={<AddSVG />} onInput={addAnswer} />
            {typeQuestion?.data.length > 0 && (
              <SelectOption
                width="170px"
                defaultValue={data.type_question?.type || LangConst.TXT_CHOOSE_TYPE_QUESTION}
                listOption={typeQuestion?.data}
                nameText="type_question_uid"
                onInput={(nameText, value) => onChange(nameText, value)}
              />
            )}
          </div>
        </div>
        <div className="footer">
          <Button type="submit" name="submit" />
        </div>
      </form>
    </div>
  );
};

QuestionMultiAnswer.defaultProps = {
  question: {
    question_text: "",
    results: [
      {
        uid: uuid(),
        content: "",
        is_result: false,
      },
      {
        uid: uuid(),
        content: "",
        is_result: false,
      },
      {
        uid: uuid(),
        content: "",
        is_result: false,
      },
      {
        uid: uuid(),
        content: "",
        is_result: false,
      },
    ],
    point: "",
    type_question_uid: "",
  },
  update: false,
};
