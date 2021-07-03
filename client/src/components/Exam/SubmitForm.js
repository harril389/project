import React, { useState, useEffect } from "react";
import Input, { InputRange, InputNumber } from "../Form/Input";
import Button from "../Button";
import { LangConst } from "const";
import { convertTimeToISO, convertTimeToMili, SplitString, listCity } from "utils";
import { useSelector, useDispatch } from "react-redux";
import QuestionAction from "redux/question.redux";
import ExamAdminAction from "redux/examAdmin.redux";
import TypeQuestionAction from "redux/typeQuestion.redux";
import UserAction from "redux/user.redux";
import Table, { TableBody, TableRow, TableCell, TableHeader, TableColumn } from "../Table";
import Pagination from "rc-pagination";
import CheckBox from "../Form/CheckBox";
import Filter from "../Filter";
import { SelectOption } from "../Selected";
import ClubAction from "redux/club.redux";
import NoData from "../NoData";

const SubmitForm = props => {
  const { isUpdate } = props;
  const dispatch = useDispatch();

  const defaultData = {
    name: "",
    start_time: 1609473600,
    end_time: 1609473600,
    time: "",
    password: "",
    description: "",
    status: 3,
    role_view_uid: null,
    question_uids: [],
    user_uids: [],
  };

  const listQuestion = useSelector(state => state.questionRedux?.data);
  const listTypeQuestion = useSelector(state => state.typeQuestionRedux?.data);
  const dataExam = useSelector(state => state.examAdminRedux?.dataUid);
  const listUser = useSelector(state => state.userRedux?.data);
  const listClub = useSelector(state => state.clubRedux?.dataAllClub);
  // const isFetching = useSelector(state => state.questionRedux.isFetching);

  const [current, setCurrent] = useState(1);
  const [currentUser, setCurrentUser] = useState(1);
  const [data, setData] = useState({
    ...defaultData,
    start_time: convertTimeToISO(defaultData?.start_time * 1000),
    end_time: convertTimeToISO(defaultData?.end_time * 1000),
    time: (parseInt(defaultData.time) / 60).toString(),
    question_uids: getUidQuestion(defaultData.questions),
    user_uids: getUidQuestion(defaultData.users),
  });

  const [searchTypeQuestion, setSearchTypeQuestion] = useState("");
  const [rangePoint, setRangePoint] = useState({
    min: "",
    max: "",
  });

  const [searchUser, setSearch] = useState({
    full_name: "",
    blood_group: "",
    address: "",
    birthday: "",
    club_uid: "",
  });

  const onChoose = (name, data) => {
    setSearchTypeQuestion(data);
    dispatch(
      QuestionAction.getListQuestion({
        paging: 1,
        size: 10,
        page: 1,
        filter: "",
        type_question_uid: data,
        point_start: rangePoint.min,
        point_end: rangePoint.max,
      }),
    );
  };

  const onChooseRange = data => {
    setRangePoint({ ...data });
    dispatch(
      QuestionAction.getListQuestion({
        paging: 1,
        size: 10,
        page: 1,
        filter: "",
        type_question_uid: searchTypeQuestion,
        point_start: data.min,
        point_end: data.max,
      }),
    );
  };

  const onChangeCurrentUser = page => {
    setCurrentUser(page);
    dispatch(
      UserAction.getListUser({
        paging: 1,
        size: 10,
        page: page,
        full_name: searchUser.full_name,
        blood_group: searchUser.blood_group,
        address: searchUser.address,
        birthday: searchUser.birthday,
        club_uid: searchUser.club_uid,
      }),
    );
  };

  const onChangeCurrent = page => {
    setCurrent(page);
    dispatch(
      QuestionAction.getListQuestion({
        paging: 1,
        size: 10,
        page: page,
        filter: "",
        type_question_uid: searchTypeQuestion,
        point_start: rangePoint.min,
        point_end: rangePoint.max,
      }),
    );
  };

  const onSubmit = e => {
    e.preventDefault();
    delete data.questions;
    let dataSubmit = { ...data };
    dataSubmit.start_time = convertTimeToMili(dataSubmit.start_time + ":00.000Z");
    dataSubmit.end_time = convertTimeToMili(dataSubmit.end_time + ":00.000Z");
    dataSubmit.time = parseInt(dataSubmit.time) * 60;
    dispatch(
      ExamAdminAction.createExam({
        data: dataSubmit,
      }),
    );
  };

  const onUpdate = e => {
    e.preventDefault();
    delete data.questions;
    let dataSubmit = { ...data };
    dataSubmit.start_time = convertTimeToMili(dataSubmit.start_time + ":00.000Z");
    dataSubmit.end_time = convertTimeToMili(dataSubmit.end_time + ":00.000Z");
    dataSubmit.time = parseInt(dataSubmit.time) * 60;
    dispatch(
      ExamAdminAction.updateExam({
        data: dataSubmit,
      }),
    );
  };

  const onChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const onChangeCheckBox = uid => {
    let listQuestion = [...data.question_uids];
    let index = listQuestion.findIndex(e => e.uid === uid);
    if (index === -1) {
      listQuestion.push({ uid: uid, status: 2 });
    } else {
      if (!listQuestion[index].status) {
        listQuestion.splice(index, 1, { uid: uid, status: 1 });
      } else if (listQuestion[index].status === 1) {
        listQuestion.splice(index, 1, { uid: uid });
      } else if (listQuestion[index].status === 2) {
        listQuestion.splice(index, 1);
      }
    }
    setData({ ...data, question_uids: listQuestion });
  };

  const onChangeCheckBoxUser = uid => {
    let dataUser = [...data.user_uids];
    let index = dataUser.findIndex(e => e.uid === uid);
    if (index === -1) {
      dataUser.push({ uid: uid, status: 2 });
    } else {
      if (!dataUser[index].status) {
        dataUser.splice(index, 1, { uid: uid, status: 1 });
      } else if (dataUser[index].status === 1) {
        dataUser.splice(index, 1, { uid: uid });
      } else if (dataUser[index].status === 2) {
        dataUser.splice(index, 1);
      }
    }
    setData({ ...data, user_uids: dataUser });
  };

  // // seach user
  const onSearch = data => {
    setSearch({ ...searchUser, full_name: data });
    dispatch(
      UserAction.getListUser({
        paging: 1,
        size: 10,
        page: current,
        full_name: data,
        blood_group: searchUser.blood_group,
        address: searchUser.address,
        birthday: searchUser.birthday,
        club_uid: searchUser.club_uid,
      }),
    );
  };

  const onChooseBranch = (name, data) => {
    setSearch({ ...searchUser, branch: data });
  };

  const onChooseClub = (name, data) => {
    setSearch({ ...searchUser, club_uid: data });
    dispatch(
      UserAction.getListUser({
        paging: 1,
        size: 10,
        page: current,
        full_name: searchUser.full_name,
        blood_group: searchUser.blood_group,
        address: searchUser.address,
        birthday: searchUser.birthday,
        club_uid: data,
      }),
    );
  };

  const onChooseCity = (name, data) => {
    setSearch({ ...searchUser, address: data });
    dispatch(
      UserAction.getListUser({
        paging: 1,
        size: 10,
        page: current,
        full_name: searchUser.full_name,
        blood_group: searchUser.blood_group,
        address: data,
        birthday: searchUser.birthday,
        club_uid: searchUser.club_uid,
      }),
    );
  };

  const onSearchBirthday = data => {
    setSearch({ ...searchUser, birthday: data });
    dispatch(
      UserAction.getListUser({
        paging: 1,
        size: 10,
        page: current,
        full_name: searchUser.full_name,
        blood_group: searchUser.blood_group,
        address: searchUser.address,
        birthday: data,
        club_uid: searchUser.club_uid,
      }),
    );
  };

  useEffect(() => {
    if (!listTypeQuestion) {
      dispatch(
        TypeQuestionAction.getListTypeQuestion({
          type_filter: "",
          paging: 0,
          size: 10,
          page: 1,
        }),
      );
    }
  }, [listTypeQuestion]);

  useEffect(() => {
    if (!listQuestion) {
      dispatch(
        QuestionAction.getListQuestion({
          paging: 1,
          size: 10,
          page: 1,
          filter: "",
          type_question_uid: searchTypeQuestion,
          point_start: rangePoint.min,
          point_end: rangePoint.max,
        }),
      );
    }
  }, [listQuestion]);

  useEffect(() => {
    if (!listUser) {
      dispatch(
        UserAction.getListUser({
          paging: 1,
          size: 10,
          page: 1,
          full_name: searchUser.full_name,
          blood_group: searchUser.blood_group,
          address: searchUser.address,
          birthday: searchUser.birthday,
          club_uid: searchUser.club_uid,
        }),
      );
    }
  }, [listUser]);

  useEffect(() => {
    if (dataExam && isUpdate) {
      setData({
        ...dataExam,
        start_time: convertTimeToISO(dataExam.start_time * 1000),
        end_time: convertTimeToISO(dataExam.end_time * 1000),
        time: (parseInt(dataExam.time) / 60).toString(),
        question_uids: getUidQuestion(dataExam.questions),
        user_uids: getUidQuestion(dataExam.users),
      });
    } else {
      setData({
        ...defaultData,
        start_time: convertTimeToISO(defaultData.start_time * 1000),
        end_time: convertTimeToISO(defaultData.end_time * 1000),
        time: (parseInt(defaultData.time) / 60).toString(),
        question_uids: getUidQuestion(defaultData.questions),
        user_uids: getUidQuestion(defaultData.users),
      });
    }
  }, [dataExam]);

  useEffect(() => {
    if (!listClub) {
      dispatch(ClubAction.getAllClub());
    }
  }, [listClub]);

  return (
    <>
      <div>
        <Input
          label={LangConst.TXT_NAME_EXAM}
          placeHolder={LangConst.TXT_INPUT_NAME_EXAM}
          name="name"
          type="text"
          defaultValue={data?.name || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
          requiredInput={true}
        />
        <Input
          label={LangConst.TXT_START_TIME}
          name="start_time"
          type="datetime-local"
          defaultValue={data?.start_time}
          onInput={(nameText, value) => onChange(nameText, value)}
          requiredInput={true}
        />
        <Input
          label={LangConst.TXT_END_TIME}
          name="end_time"
          type="datetime-local"
          defaultValue={data?.end_time}
          onInput={(nameText, value) => onChange(nameText, value)}
          requiredInput={true}
        />
        <Input
          label={LangConst.TXT_TIME}
          name="time"
          type="number"
          defaultValue={data?.time || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
          requiredInput={true}
        />
        <Input
          label={LangConst.TXT_PASSWORD}
          placeHolder={LangConst.TXT_INPUT_PASSWORD}
          name="password"
          type="text"
          defaultValue={data?.password || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <Input
          label={LangConst.TXT_DESCRIPTION}
          placeHolder={LangConst.TXT_INPUT_DESCRIPTION}
          name="description"
          type="text"
          defaultValue={data?.description || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <Input
          label={LangConst.TXT_EXAM_SCOPE}
          placeHolder={LangConst.TXT_INPUT_EXAM_SCOPE}
          name="role_view_uid"
          type="text"
          defaultValue={data?.role_view_uid || ""}
          onInput={(nameText, value) => onChange(nameText, value)}
        />
        <div className="exam">
          <Table
            header={
              <TableHeader>
                <TableRow>
                  <TableColumn>
                    <div className="total-btn">{data?.question_uids.length}</div>
                  </TableColumn>
                  <TableColumn>{LangConst.TXT_STT}</TableColumn>
                  <TableColumn>{LangConst.TXT_INDEX_QUESTION}</TableColumn>
                  <TableColumn>
                    <Filter title={LangConst.TXT_TOTAL_POINT}>
                      <InputRange onInput={value => onChooseRange(value)} />
                    </Filter>
                  </TableColumn>
                  <TableColumn>
                    <SelectOption
                      defaultValue={LangConst.TXT_TYPE_QUESTION}
                      listOption={listTypeQuestion?.data}
                      onInput={(nameText, value) => onChoose(nameText, value)}
                    />
                  </TableColumn>
                </TableRow>
              </TableHeader>
            }
            body={
              <TableBody>
                {listQuestion?.data?.length > 0 &&
                  listQuestion.data.map((item, index) => (
                    <TableRow key={"table2" + item.uid}>
                      <TableCell width="20px" align="center">
                        <CheckBox
                          value={item.uid}
                          onInput={e => onChangeCheckBox(e)}
                          checked={checkQuestionExist(data?.question_uids, item.uid)}
                        />
                      </TableCell>
                      <TableCell width="20px" align="center">
                        {index + 1}
                      </TableCell>
                      <TableCell width="450px">{item?.question_text}</TableCell>
                      <TableCell width="20px" align="center">
                        {item?.point}
                      </TableCell>
                      <TableCell width="150px">{item?.type_question?.type}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            }
          />
          <div className="box-pagination">
            <Pagination
              onChange={onChangeCurrent}
              current={current}
              defaultCurrent={1}
              showTitle={false}
              total={listQuestion?.total || 0}
              showLessItems
              showQuickJumper
              locale={"vi_VN"}
            />
          </div>
        </div>
        <div className="exam">
          <Table
            header={
              <TableHeader>
                <TableRow>
                  <TableColumn>
                    <div className="total-btn">{data?.user_uids.length}</div>
                  </TableColumn>
                  <TableColumn>{LangConst.TXT_STT}</TableColumn>
                  <TableColumn>{LangConst.TXT_FULL_NAME}</TableColumn>
                  <TableColumn width="135px">
                    <Filter title={LangConst.TXT_BIRTHDAY} padding="0px 15px">
                      <InputNumber
                        placeholder={LangConst.TXT_YEAR_OF_BIRTH}
                        onInput={value => onSearchBirthday(value)}
                      />
                    </Filter>
                  </TableColumn>
                  <TableColumn width="135px">
                    <SelectOption
                      defaultValue={LangConst.TXT_HONE_TOWN}
                      value="name"
                      content="name"
                      listOption={listCity}
                      onInput={(nameText, value) => onChooseCity(nameText, value)}
                      padding="0px 15px"
                    />
                  </TableColumn>
                  <TableColumn>
                    {LangConst.TXT_BRANCH}
                    {/* <SelectOption
                      defaultValue=
                      value="id"
                      content="Machihoi"
                      // listOption={branch}
                      onInput={(nameText, value) => onChooseBranch(nameText, value)}
                      padding="0px 15px"
                    /> */}
                  </TableColumn>
                  <TableColumn align="center">
                    <SelectOption
                      width="280px"
                      defaultValue={LangConst.TXT_CLUB}
                      content="name_club"
                      value="uid"
                      listOption={listClub?.data}
                      onInput={(nameText, value) => onChooseClub(nameText, value)}
                      padding="0px 15px"
                      nameText="club_uid"
                    />
                  </TableColumn>
                  <TableColumn>{LangConst.TXT_POSITION}</TableColumn>
                </TableRow>
              </TableHeader>
            }
            body={
              <TableBody>
                {listUser?.data?.length > 0 &&
                  listUser?.data.map((item, index) => (
                    <TableRow key={"table2" + index}>
                      <TableCell width="20px" align="center">
                        <CheckBox
                          value={item.user_uid}
                          onInput={e => onChangeCheckBoxUser(e)}
                          checked={checkQuestionExist(data?.user_uids, item.user_uid)}
                        />
                      </TableCell>
                      <TableCell width="20px" align="center">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">
                        {item.full_name}
                        <div style={{ color: item?.status_activity ? "rgba(91, 255, 91,1)" : "rgba(0,0,0,0.2)" }}>
                          {item.code_membership}
                        </div>
                      </TableCell>
                      <TableCell align="center">{item.birthday}</TableCell>
                      <TableCell>{item.address}</TableCell>
                      <TableCell width="100px" align="center">
                        {item?.club?.branch?.name_branch && SplitString(item?.club?.branch?.name_branch)}
                      </TableCell>
                      <TableCell width="300px">{item?.club?.name_club}</TableCell>
                      <TableCell>{item?.position?.position}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            }
          />
          {listUser?.data?.length === 0 && <NoData />}
          <div className="box-pagination">
            <Pagination
              onChange={onChangeCurrentUser}
              current={currentUser}
              defaultCurrent={1}
              showTitle={false}
              total={listUser?.total || 0}
              showLessItems
              showQuickJumper
              locale={"vi_VN"}
            />
          </div>
        </div>
        <div className="submit">
          <Button type="submit" name="submit" onClick={isUpdate ? onUpdate : onSubmit} />
        </div>
      </div>
    </>
  );
};

SubmitForm.defaultProps = {
  isUpdate: false,
};

export default SubmitForm;

// check checkbox choose
const checkQuestionExist = (data, uid) => {
  if (data.length === 0) {
    return false;
  } else {
    let index = data.findIndex(e => e.uid === uid);
    if (index !== -1) {
      if (!data[index].status) {
        return true;
      } else if (data[index].status && data[index].status === 1) {
        return false;
      } else if (data[index].status && data[index].status === 2) {
        return true;
      }
    } else {
      return false;
    }
  }
};

const getUidQuestion = data => {
  let listUid = [];
  if (data) {
    data.forEach(e => listUid.push({ uid: e.uid }));
    return listUid;
  } else {
    return [];
  }
};
