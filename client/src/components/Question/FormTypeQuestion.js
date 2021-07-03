import React, { useState } from "react";
import Input from "../Form/Input";
import Button from "../Button";
import { useDispatch } from "react-redux";
import TypeQuestionAction from "redux/typeQuestion.redux";

const FormTypeQuestion = props => {
  const { typeQuestion, update } = props;

  const dispatch = useDispatch();

  const [data, setData] = useState({ ...typeQuestion });

  const onChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!data.type) {
      alert("Chưa nhập loại câu hỏi");
    } else if (!data.description) {
      alert("Chưa nhập mô tả");
    } else {
      dispatch(TypeQuestionAction.createTypeQuestion({ data: data }));
    }
  };

  const onUpdate = e => {
    e.preventDefault();
    if (!data.type) {
      alert("Chưa nhập loại câu hỏi");
    } else if (!data.description) {
      alert("Chưa nhập mô tả");
    } else {
      dispatch(TypeQuestionAction.updateTypeQuestion({ data: data }));
    }
  };

  return (
    <div className="para-type-question">
      <div className="title semiBold-lg-txt">Loại câu hỏi</div>
      <form className="main" onSubmit={update ? onUpdate : onSubmit}>
        <div className="form">
          <Input
            label="Loại câu hỏi"
            placeHolder="Nhập loại câu hỏi..."
            name="type"
            uuid="type-question"
            type="text"
            defaultValue={data?.type}
            onInput={(nameText, value) => onChange(nameText, value)}
          />
          <Input
            label="Mô tả"
            placeHolder="Nhập mô tả..."
            name="description"
            uuid="type-question-description"
            type="text"
            defaultValue={data?.description}
            onInput={(nameText, value) => onChange(nameText, value)}
          />
        </div>
        <div className="footer">
          <Button type="submit" name="submit" />
        </div>
      </form>
    </div>
  );
};

FormTypeQuestion.defaultProps = {
  typeQuestion: {
    type: "",
    description: "",
  },
  update: false,
};
export default FormTypeQuestion;
