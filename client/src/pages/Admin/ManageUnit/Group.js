import React, { useState, useEffect } from "react";
import { Input, Button, Toast } from "components";
import { LangConst } from "const";
import { useLocation } from "react-router-dom";
import LayoutUnit from "./layout";
import { useSelector, useDispatch } from "react-redux";
import GroupAction from "redux/group.redux";
import { SuccessSVG } from "theme/icons";

const ManageGroup = props => {
  const currentPath = useLocation().pathname;
  const dispatch = useDispatch();
  const dataGroup = useSelector(state => state.groupRedux?.data);
  const updateSuccess = useSelector(state => state.groupRedux?.updateSuccess);

  const [data, setData] = useState({
    id: 1,
    chairman: "",
    vice_chairman_1: "",
    vice_chairman_2: "",
    vice_chairman_3: "",
    vice_chairman_4: "",
    prestige_1: "",
    prestige_2: "",
    sympathizer: "",
    staff_strengthened: "",
    member: "",
    instructor: "",
    volunteer: "",
    coach: "",
    founded_year: "",
    traditional_day: "",
  });

  const onChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const onChangePDFHistory = e => {
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      dispatch(GroupAction.uploadPDFHistory(e.target.files[0]));
    }
  };

  const onChangePDFIntroduction = e => {
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      dispatch(GroupAction.uploadPDFIntroduction(e.target.files[0]));
    }
  };

  const onCheckSuccess = () => {
    dispatch(GroupAction.groupSuccess({ updateSuccess: false }));
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(GroupAction.updateGroup({ data: data }));
  };

  useEffect(() => {
    if (!dataGroup) {
      dispatch(GroupAction.getGroup());
    } else if (dataGroup) {
      setData({ ...dataGroup });
    }
  }, [dataGroup]);

  return (
    <LayoutUnit currentPath={currentPath}>
      {updateSuccess && (
        <Toast
          title={<SuccessSVG width="50px" height="50px" color="rgba(91, 255, 91,1)" />}
          message={"Success"}
          onChange={onCheckSuccess}
        />
      )}
      <div className="group">
        <div className="box-button">
          <div>Tài liệu lịch sử Hội: </div>
          <div>
            <input className="button-group" type="file" onChange={onChangePDFHistory} />
          </div>
        </div>
        <div className="box-button">
          <div>Tài liệu giới thiệu Hội: </div>
          <div>
            <input className="button-group" type="file" onChange={onChangePDFIntroduction} />
          </div>
        </div>
        <form onSubmit={onSubmit}>
          <Input
            label={LangConst.TXT_ASSOCIATION_PRESIDENT}
            placeHolder={LangConst.TXT_INPUT_ASSOCIATION_PRESIDENT}
            name="chairman"
            type="text"
            defaultValue={data?.chairman || ""}
            onInput={(nameText, value) => onChange(nameText, value)}
            requiredInput={true}
          />
          <Input
            label={LangConst.TXT_ASSOCIATION_VICE_PRESIDENT}
            placeHolder={LangConst.TXT_INPUT_ASSOCIATION_VICE_PRESIDENT}
            name="vice_chairman_1"
            type="text"
            defaultValue={data?.vice_chairman_1 || ""}
            onInput={(nameText, value) => onChange(nameText, value)}
            requiredInput={true}
          />
          <Input
            label={LangConst.TXT_ASSOCIATION_VICE_PRESIDENT}
            placeHolder={LangConst.TXT_INPUT_ASSOCIATION_VICE_PRESIDENT}
            name="vice_chairman_2"
            type="text"
            defaultValue={data?.vice_chairman_2 || ""}
            onInput={(nameText, value) => onChange(nameText, value)}
            requiredInput={true}
          />
          <Input
            label={LangConst.TXT_ASSOCIATION_VICE_PRESIDENT}
            placeHolder={LangConst.TXT_INPUT_ASSOCIATION_VICE_PRESIDENT}
            name="vice_chairman_3"
            type="text"
            defaultValue={data?.vice_chairman_3 || ""}
            onInput={(nameText, value) => onChange(nameText, value)}
            requiredInput={true}
          />
          <Input
            label={LangConst.TXT_ASSOCIATION_VICE_PRESIDENT}
            placeHolder={LangConst.TXT_INPUT_ASSOCIATION_VICE_PRESIDENT}
            name="vice_chairman_4"
            type="text"
            defaultValue={data?.vice_chairman_4 || ""}
            onInput={(nameText, value) => onChange(nameText, value)}
            requiredInput={true}
          />
          <Input
            label={LangConst.TXT_STANDING_COMMITTEE_MEMBERS}
            placeHolder={LangConst.TXT_INPUT_STANDING_COMMITTEE_MEMBERS}
            name="prestige_1"
            type="text"
            defaultValue={data?.prestige_1 || ""}
            onInput={(nameText, value) => onChange(nameText, value)}
            requiredInput={true}
          />
          <Input
            label={LangConst.TXT_STANDING_COMMITTEE_MEMBERS}
            placeHolder={LangConst.TXT_INPUT_STANDING_COMMITTEE_MEMBERS}
            name="prestige_2"
            type="text"
            defaultValue={data?.prestige_2 || ""}
            onInput={(nameText, value) => onChange(nameText, value)}
            requiredInput={true}
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
          <Input
            label={LangConst.TXT_FOUNDED_DAY}
            name="founded_year"
            type="date"
            defaultValue={data?.founded_year || ""}
            onInput={(nameText, value) => onChange(nameText, value)}
          />
          <Input
            label={LangConst.TXT_TRADITIONAL_DAY}
            name="traditional_day"
            type="date"
            defaultValue={data?.traditional_day || ""}
            onInput={(nameText, value) => onChange(nameText, value)}
          />
          <div className="submit">
            <Button type="submit" name="submit" />
          </div>
        </form>
      </div>
    </LayoutUnit>
  );
};

export default ManageGroup;
