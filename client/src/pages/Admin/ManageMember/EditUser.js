import React, { useState } from "react";
import { Input, SelectOption, Button, Table, TableBody, TableRow, TableCell, ButtonIcon, Radio } from "components";
import { LangConst } from "const";
import { listBlood, listRh } from "utils";
import { useDispatch } from "react-redux";
import UserAction from "redux/user.redux";
import { TrashSVG, AddSVG } from "theme/icons";

const EditMember = props => {
  const { dataMember } = props;
  const dispatch = useDispatch();

  const [data, setData] = useState({
    ...dataMember,
    majors: dataMember?.school?.majors,
    gpa: dataMember?.school?.gpa,
    class: dataMember?.school?.class,
    school: dataMember?.school?.school,
  });
  console.log(data);

  const onChange = (name, value) => {
    setData({ ...data, [name]: value });
  };
  const onChooseRh = (name, value) => {
    setData({ ...data, rh: value });
  };
  const onChooseBlood = (name, value) => {
    setData({ ...data, blood_group: value });
  };

  const addActivities = () => {
    let customData = [...data.activitys];
    customData.push({
      activity_school_year: "",
      activity_semester: "",
      activity_reason: "",
    });
    setData({ ...data, activitys: customData });
  };

  const deleteActivities = index => {
    let customData = [...data.activitys];
    customData.splice(index, 1);
    setData({ ...data, activitys: customData });
  };

  const onChangeActivitiesSchool = (index, value) => {
    let customData = [...data.activitys];
    customData[index].activity_school_year = value;
    setData({ ...data, activitys: customData });
  };
  const onChangeActivitiesSemester = (index, value) => {
    let customData = [...data.activitys];
    customData[index].activity_semester = value;
    setData({ ...data, activitys: customData });
  };
  const onChangeActivitiesReason = (index, value) => {
    let customData = [...data.activitys];
    customData[index].activity_reason = value;
    setData({ ...data, activitys: customData });
  };

  const addLearns = () => {
    let customData = [...data.learns];
    customData.push({
      learn_school_year: "",
      learn_semester: "",
      learn_reason: "",
    });
    setData({ ...data, learns: customData });
  };

  const deleteLearns = index => {
    let customData = [...data.learns];
    customData.splice(index, 1);
    setData({ ...data, learns: customData });
  };

  const onChangeLearnsSchool = (index, value) => {
    let customData = [...data.learns];
    customData[index].learn_school_year = value;
    setData({ ...data, learns: customData });
  };
  const onChangeLearnsSemester = (index, value) => {
    let customData = [...data.learns];
    customData[index].learn_semester = value;
    setData({ ...data, learns: customData });
  };
  const onChangeLearnsReason = (index, value) => {
    let customData = [...data.learns];
    customData[index].learn_reason = value;
    setData({ ...data, learns: customData });
  };

  const onChangeGender = value => {
    setData({ ...data, sex: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log(data);
    delete data.club;
    delete data.position;
    delete data.specialized;
    dispatch(UserAction.updateMemberAdmin({ data: data }));
  };

  return (
    <div className="para-edit-profile">
      <form onSubmit={onSubmit}>
        <Input
          label={LangConst.TXT_FULL_NAME}
          placeHolder="Nhập họ và tên..."
          name="full_name"
          type="text"
          defaultValue={data?.full_name || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <Input
          label={LangConst.TXT_BIRTHDAY}
          placeHolder="Nhập ngày sinh..."
          name="birthday"
          type="date"
          defaultValue={data?.birthday || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <div style={{ display: "flex", alignItems: "center", height: "40px" }}>
          <Radio
            name="sex"
            onInput={index => onChangeGender(index)}
            uid="nam"
            value={true}
            content="Nam"
            checked={data?.sex === true}
          />
          <Radio
            name="sex"
            onInput={index => onChangeGender(index)}
            uid="nu"
            value={false}
            content="Nữ"
            checked={data?.sex === false}
          />
        </div>
        <Input
          label={LangConst.TXT_ID_CARD}
          placeHolder="Nhập CMND/CCCD/HC..."
          name="id_card"
          type="text"
          defaultValue={data?.id_card || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <Input
          label={LangConst.TXT_DATE_OF_ISSUE}
          placeHolder="Nhập ngày cấp..."
          name="date_of_issue"
          type="date"
          defaultValue={data?.date_of_issue || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <Input
          label={LangConst.TXT_ISSUED_BY}
          placeHolder="Nhập nơi cấp..."
          name="issued_by"
          type="text"
          defaultValue={data?.issued_by || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <Input
          label={LangConst.TXT_PHONE}
          placeHolder="Nhập số điện thoại..."
          name="phonee"
          type="text"
          defaultValue={data?.phonee || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <Input
          label={LangConst.TXT_FACEBOOK}
          placeHolder="Nhập link Facebook..."
          name="facebook"
          type="text"
          defaultValue={data?.facebook || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <Input
          label={LangConst.TXT_EMAIL}
          placeHolder="Nhập địa chỉ Email..."
          name="email"
          type="text"
          defaultValue={data?.email || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <Input
          label={LangConst.TXT_NUMBER_BLOOD_DONATE}
          placeHolder="Nhập số lần hiến máu..."
          name="number_blood_donate"
          type="number"
          defaultValue={data?.number_blood_donate || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <Input
          label={LangConst.TXT_UNIT_MEMBER}
          placeHolder="Nhập đơn vị học tập/Công tác..."
          name="unit"
          type="text"
          defaultValue={data?.unit || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <Input
          label={LangConst.TXT_SPECIFIC_UNIT}
          placeHolder="Nhập Khoa/Đơn vị cụ thể..."
          name="specific_unit"
          type="text"
          defaultValue={data?.specific_unit || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <Input
          label={LangConst.TXT_PARTY_UNION_MEMBER}
          placeHolder="Nhập đoàn viên/Đảng viên..."
          name="party_union_member"
          type="text"
          defaultValue={data?.party_union_member || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <Input
          label={LangConst.TXT_ACADEMIC_LEVEL}
          placeHolder="Nhập trình độ học vấn..."
          name="academic_level"
          type="text"
          defaultValue={data?.academic_level || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <Input
          label={LangConst.TXT_NATIVE_LAND}
          placeHolder="Nhập quê quán..."
          name="native_land"
          type="text"
          defaultValue={data?.native_land || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <Input
          label={LangConst.TXT_ADDRESS}
          placeHolder="Nhập nơi ở hiện nay..."
          name="address"
          type="text"
          defaultValue={data?.address || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <Input
          label={LangConst.TXT_INFORMATION_FAMILY}
          placeHolder="Nhập địa chỉ liên hệ gia đình..."
          name="information_family"
          type="text"
          defaultValue={data?.information_family || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <Input
          label={LangConst.TXT_COMMENT}
          placeHolder="Nhập ghi chú..."
          name="comment"
          type="text"
          defaultValue={data?.comment || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <Input
          label={LangConst.TXT_SCHOOL}
          placeHolder="Nhập trường..."
          name="school"
          type="text"
          defaultValue={data?.school || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <Input
          label={LangConst.TXT_CLASS}
          placeHolder="Nhập lớp..."
          name="class"
          type="text"
          defaultValue={data?.class || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <Input
          label={LangConst.TXT_MAJOR}
          placeHolder="Nhập chuyên ngành..."
          name="majors"
          type="text"
          defaultValue={data?.majors || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <Input
          label={LangConst.TXT_GPA}
          placeHolder="Nhập gpa..."
          name="gpa"
          type="text"
          defaultValue={data?.gpa || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <div className="choose-option">
          <SelectOption
            defaultValue={data?.blood_group || LangConst.TXT_BLOOD}
            value="value"
            content="value"
            listOption={listBlood}
            onInput={(nameText, value) => onChooseBlood(nameText, value)}
            padding="0px 15px"
          />
          <SelectOption
            defaultValue={data?.rh || LangConst.TXT_RH}
            value="value"
            content="name"
            listOption={listRh}
            onInput={(nameText, value) => onChooseRh(nameText, value)}
            padding="0px 15px"
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          Hoạt động
          <ButtonIcon type="button" icon={<AddSVG />} onInput={addActivities} />
        </div>
        <Table
          body={
            <TableBody>
              <TableRow>
                <TableCell width="20px" align="center">
                  STT
                </TableCell>
                <TableCell width="150px" align="center">
                  Năm học
                </TableCell>
                <TableCell width="150px" align="center">
                  Kỳ học
                </TableCell>
                <TableCell width="150px" align="center">
                  Lý do khen thưởng
                </TableCell>
              </TableRow>
              {data?.activitys &&
                data?.activitys.length &&
                data?.activitys.map((item, index) => (
                  <TableRow key={"activities" + index}>
                    <TableCell width="20px" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <Input
                        placeHolder="Nhập năm học..."
                        name={index}
                        type="text"
                        defaultValue={item.activity_school_year || ""}
                        onInput={(nameText, value) => onChangeActivitiesSchool(nameText, value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        placeHolder="Nhập kỳ..."
                        name={index}
                        type="text"
                        defaultValue={item.activity_semester || ""}
                        onInput={(nameText, value) => onChangeActivitiesSemester(nameText, value)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Input
                        placeHolder="Nhập lý do khen thưởng..."
                        name={index}
                        type="text"
                        defaultValue={item.activity_reason || ""}
                        onInput={(nameText, value) => onChangeActivitiesReason(nameText, value)}
                      />
                    </TableCell>
                    <TableCell align="center" width="20px">
                      <ButtonIcon
                        type="button"
                        icon={<TrashSVG />}
                        value={index}
                        onInput={value => deleteActivities(value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          }
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          Học Tập
          <ButtonIcon type="button" icon={<AddSVG />} onInput={addLearns} />
        </div>
        <Table
          body={
            <TableBody>
              <TableRow>
                <TableCell width="20px" align="center">
                  STT
                </TableCell>
                <TableCell width="150px" align="center">
                  Năm học
                </TableCell>
                <TableCell width="150px" align="center">
                  Kỳ học
                </TableCell>
                <TableCell width="150px" align="center">
                  Lý do khen thưởng
                </TableCell>
              </TableRow>
              {data?.learns &&
                data?.learns.length &&
                data?.learns.map((item, index) => (
                  <TableRow key={"leanrns" + index}>
                    <TableCell width="20px" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <Input
                        placeHolder="Nhập năm học..."
                        name={index}
                        type="text"
                        defaultValue={item.learn_school_year || ""}
                        onInput={(nameText, value) => onChangeLearnsSchool(nameText, value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        placeHolder="Nhập kỳ..."
                        name={index}
                        type="text"
                        defaultValue={item.learn_semester || ""}
                        onInput={(nameText, value) => onChangeLearnsSemester(nameText, value)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Input
                        placeHolder="Nhập lý do khen thưởng..."
                        name={index}
                        type="text"
                        defaultValue={item.learn_reason || ""}
                        onInput={(nameText, value) => onChangeLearnsReason(nameText, value)}
                      />
                    </TableCell>
                    <TableCell align="center" width="20px">
                      <ButtonIcon
                        type="button"
                        icon={<TrashSVG />}
                        value={index}
                        onInput={value => deleteLearns(value)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          }
        />

        <div className="submit">
          <Button type="submit" name="submit" />
        </div>
      </form>
    </div>
  );
};

EditMember.defaultProps = {
  id_card: "1",
  date_of_issue: "1",
  issued_by: "1",
  phone: "1",
  email: "1",
  facebook: "1",
  native_land: "1",
  address: "1",
  blood_group: "1",
  rh: "1",
  number_blood_donate: "1",
  date_attend: "",
  time_activity: "",
  status_activity: "",
  information_family: "1",
  unit: "1",
  specific_unit: "1",
  academic_level: "1",
  party_union_member: "1",
  comment: "1",
  specialized_uid: "",
  position_uid: "",
  club_uid: "",
  school: "1",
  class: "1",
  majors: "1",
  gpa: "1",
  learns: [],
  activitys: [],
};

export default EditMember;
