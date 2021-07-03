import React, { useState } from "react";
import Input from "../Form/Input";
import { LangConst } from "const";
import Button from "../Button";
import { useDispatch } from "react-redux";
import BranchAction from "redux/branch.redux";

const FormBranch = props => {
  const { dataBranch, isUpdate } = props;

  const dispatch = useDispatch();

  const [data, setData] = useState({ ...dataBranch });

  const onChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const onCreate = e => {
    e.preventDefault();
    if (!data.name_branch) {
      alert("Chưa nhập tên đơn vị");
    } else if (!data.code_branch) {
      alert("Chưa mã đơn vị");
    } else {
      dispatch(BranchAction.createBranch({ data: data }));
    }
  };

  const onUpdate = e => {
    e.preventDefault();
    if (!data.name_branch) {
      alert("Chưa nhập tên đơn vị");
    } else if (!data.code_branch) {
      alert("Chưa mã đơn vị");
    } else {
      dispatch(BranchAction.updateBranch({ data: data }));
    }
  };

  return (
    <form className="para-form-unit" onSubmit={isUpdate ? onUpdate : onCreate}>
      <div>
        <Input
          label={LangConst.TXT_UNIT}
          placeHolder={LangConst.TXT_INPUT_UNIT}
          name="name_branch"
          type="text"
          defaultValue={data?.name_branch || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
          requiredInput={true}
        />
        <Input
          label={LangConst.TXT_CODE_UNIT}
          placeHolder={LangConst.TXT_INPUT_CODE_UNIT}
          name="code_branch"
          type="text"
          defaultValue={data?.code_branch || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
          requiredInput={true}
        />
        <Input
          label={LangConst.TXT_ADDRESS}
          placeHolder={LangConst.TXT_INPUT_ADDRESS}
          name="address"
          type="text"
          defaultValue={data?.address || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <Input
          label={LangConst.TXT_MANAGER}
          placeHolder={LangConst.TXT_INPUT_MANAGER}
          name="manager"
          type="text"
          defaultValue={data?.manager || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <Input
          label={LangConst.TXT_FOUNDED_DAY}
          name="founded_day"
          type="date"
          defaultValue={data?.founded_day || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <Input
          label={LangConst.TXT_TRADITIONAL_DAY}
          name="traditional_day"
          type="date"
          defaultValue={data?.traditional_day || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <Input
          label={LangConst.TXT_PLACE_BLOOD_DONATE}
          name="place_blood_donate"
          type="text"
          defaultValue={data?.place_blood_donate || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <Input
          label={LangConst.TXT_RESULT_ACTIVITY}
          name="result_activity"
          type="text"
          defaultValue={data?.result_activity || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <Input
          label={LangConst.TXT_NEWBIE}
          name="sympathizer"
          type="number"
          defaultValue={data?.sympathizer || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
          min="0"
        />
        <Input
          label={LangConst.TXT_VOLUNTEER}
          name="volunteer"
          type="number"
          defaultValue={data?.volunteer || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
          min="0"
        />
        <Input
          label={LangConst.TXT_MEMBER}
          name="member"
          type="number"
          defaultValue={data?.member || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
          min="0"
        />
        <Input
          label={LangConst.TXT_STAFF_STRENGTHENED}
          name="staff_strengthened"
          type="number"
          defaultValue={data?.staff_strengthened || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
          min="0"
        />
        <Input
          label={LangConst.TXT_COACH}
          name="coach"
          type="number"
          defaultValue={data?.coach || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
          min="0"
        />
        <Input
          label={LangConst.TXT_INSTRUCTOR}
          name="instructor"
          type="number"
          defaultValue={data?.instructor || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
          min="0"
        />
      </div>
      <div className="submit">
        <Button type="submit" name="submit" />
      </div>
    </form>
  );
};

FormBranch.defaultProps = {
  dataBranch: {
    address: "",
    coach: "",
    code_branch: "",
    founded_day: "",
    instructor: "",
    manager: "",
    member: "",
    name_branch: "",
    place_blood_donate: "",
    result_activity: "",
    staff_strengthened: "",
    sympathizer: "",
    traditional_day: "",
    volunteer: "",
    place_under: "",
  },
  isUpdate: false,
};

export default FormBranch;
