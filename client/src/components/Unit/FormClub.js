import React, { useState, useEffect } from "react";
import Input from "../Form/Input";
import { LangConst } from "const";
import Button from "../Button";
import ClubAction from "redux/club.redux";
import { useSelector, useDispatch } from "react-redux";
import { SelectOption } from "../Selected";
import BranchAction from "redux/branch.redux";

const FormClub = props => {
  const { dataClub, isUpdate, name_branch } = props;

  const dispatch = useDispatch();
  const dataBranch = useSelector(state => state.branchRedux?.data);
  const [data, setData] = useState({
    ...dataClub,
    name_branch: name_branch,
  });

  const onChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const onChooseBranch = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const onCreate = e => {
    e.preventDefault();
    if (!data.name_club) {
      alert("Chưa nhập tên đơn vị");
    } else if (!data.code_club) {
      alert("Chưa chọn mã đơn vị");
    } else if (!data.branch_uid) {
      alert("Chưa chọn Chi Hội");
    } else {
      dispatch(ClubAction.createClub({ data: data }));
    }
  };

  const onUpdate = e => {
    e.preventDefault();
    if (!data.name_club) {
      alert("Chưa nhập tên đơn vị");
    } else if (!data.code_club) {
      alert("Chưa chọn mã đơn vị");
    } else if (!data.branch_uid) {
      alert("Chưa chọn Chi Hội");
    } else {
      dispatch(ClubAction.updateClub({ data: data }));
    }
  };

  useEffect(() => {
    if (!dataBranch) {
      dispatch(BranchAction.getListBranch());
    }
  }, [dataBranch]);

  return (
    <form className="para-form-unit" onSubmit={isUpdate ? onUpdate : onCreate}>
      <div>
        <Input
          label={LangConst.TXT_UNIT}
          placeHolder={LangConst.TXT_INPUT_UNIT}
          name="name_club"
          type="text"
          defaultValue={data?.name_club || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
          requiredInput={true}
        />
        <Input
          label={LangConst.TXT_CODE_UNIT}
          placeHolder={LangConst.TXT_INPUT_CODE_UNIT}
          name="code_club"
          type="text"
          defaultValue={data?.code_club || ""}
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
        <SelectOption
          defaultValue={data.name_branch || LangConst.TXT_BRANCH}
          value="uid"
          content="code_branch"
          nameText="branch_uid"
          listOption={dataBranch?.data}
          onInput={(nameText, value) => onChooseBranch(nameText, value)}
          padding="0px 15px"
        />
      </div>
      <div className="submit">
        <Button type="submit" name="submit" />
      </div>
    </form>
  );
};

FormClub.defaultProps = {
  dataBranch: {
    address: "",
    coach: null,
    code_club: "",
    founded_day: "",
    instructor: null,
    member: null,
    name_club: "",
    place_blood_donate: "",
    result_activity: "",
    staff_strengthened: null,
    sympathizer: null,
    traditional_day: "",
    volunteer: null,
    place_under: "",
    management_unit: "",
    branch_uid: "",
    manager: "",
    name_branch: "",
  },
  name_branch: LangConst.TXT_BRANCH,
  isUpdate: false,
};

export default FormClub;
