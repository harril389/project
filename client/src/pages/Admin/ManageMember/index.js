import React, { useState, useEffect } from "react";
import { MainLayout } from "layouts";
import Pagination from "rc-pagination";
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHeader,
  TableColumn,
  Search,
  Filter,
  SelectOption,
  Modal,
  InputNumber,
  Input,
  Radio,
  Button,
  Toast,
} from "components";
import { LangConst } from "const";
import { listCity } from "utils";
import { AddSVG, SuccessSVG } from "theme/icons";
import { useSelector, useDispatch } from "react-redux";
import PositionAction from "redux/position.redux";
import SpecializedAction from "redux/specialized.redux";
import ClubAction from "redux/club.redux";
import UserAction from "redux/user.redux";
import { SplitString } from "utils";
import EditMember from "./EditUser";

const ManageMember = props => {
  // const { children } = props;
  const dispatch = useDispatch();

  const data = useSelector(state => state.userRedux?.data);
  const listClub = useSelector(state => state.clubRedux?.dataAllClub);
  const isUpdateUserMemberSuccess = useSelector(state => state.userRedux?.isUpdateUserMemberSuccess);

  const [current, setCurrent] = useState(1);
  const [search, setSearch] = useState({
    full_name: "",
    blood_group: "",
    address: "",
    birthday: "",
    club_uid: "",
  });

  const onChangeCurrent = async page => {
    setCurrent(page);
    dispatch(
      UserAction.getListUser({
        paging: 1,
        size: 10,
        page: page,
        full_name: search.full_name,
        blood_group: search.blood_group,
        address: search.address,
        birthday: search.birthday,
        club_uid: search.club_uid,
      }),
    );
  };

  const onSearch = data => {
    setSearch({ ...search, full_name: data });
    dispatch(
      UserAction.getListUser({
        paging: 1,
        size: 10,
        page: current,
        full_name: data,
        blood_group: search.blood_group,
        address: search.address,
        birthday: search.birthday,
        club_uid: search.club_uid,
      }),
    );
  };

  // const onChooseBranch = (name, data) => {
  //   setSearch({ ...search, branch: data });
  //   console.log(data);
  // };

  const onChooseClub = (name, data) => {
    setSearch({ ...search, club_uid: data });
  };

  const onChooseCity = (name, data) => {
    setSearch({ ...search, address: data });
    // console.log(data);
  };

  const onSearchBirthday = data => {
    setSearch({ ...search, birthday: data });
    dispatch(
      UserAction.getListUser({
        paging: 1,
        size: 10,
        page: current,
        full_name: search.full_name,
        blood_group: search.blood_group,
        address: search.address,
        birthday: data,
        club_uid: search.club_uid,
      }),
    );
  };

  const onCheckSuccess = () => {
    dispatch(UserAction.userSuccess({ isUpdateUserMemberSuccess: false }));
  };

  useEffect(() => {
    if (!data) {
      dispatch(
        UserAction.getListUser({
          paging: 1,
          size: 10,
          page: 1,
          full_name: search.full_name,
          blood_group: search.blood_group,
          address: search.address,
          birthday: search.birthday,
          club_uid: search.club_uid,
        }),
      );
    }
  }, [data]);

  console.log(data);

  useEffect(() => {
    if (!listClub) {
      dispatch(ClubAction.getAllClub());
    }
  }, [listClub]);

  return (
    <MainLayout
      name={
        <div className="default-frames">
          <Search id="search-member" placeHolder={LangConst.TXT_SEARCH_MEMBER} onInput={value => onSearch(value)} />
          <Modal name={<AddSVG />} isIcon={true} title="Tạo thành viên mới">
            <FormMember />
          </Modal>
        </div>
      }
    >
      {isUpdateUserMemberSuccess && (
        <Toast
          title={<SuccessSVG width="50px" height="50px" color="rgba(91, 255, 91,1)" />}
          message={"Success"}
          onChange={onCheckSuccess}
        />
      )}
      <div className="para-manage-member">
        <Table
          header={
            <TableHeader>
              <TableRow>
                <TableColumn>{LangConst.TXT_STT}</TableColumn>
                <TableColumn>{LangConst.TXT_FULL_NAME}</TableColumn>
                <TableColumn width="135px">
                  <Filter title={LangConst.TXT_BIRTHDAY} padding="0px 15px">
                    <InputNumber placeholder={LangConst.TXT_YEAR_OF_BIRTH} onInput={value => onSearchBirthday(value)} />
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
                <TableColumn>{LangConst.TXT_BRANCH}</TableColumn>
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
              {data?.data?.length > 0 &&
                data.data.map((item, index) => (
                  <TableRow key={"table2" + index}>
                    <TableCell width="20px" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <Modal name={item.full_name} title={item.full_name}>
                        <EditMember dataMember={item} />
                      </Modal>
                      <div style={{ color: item?.status_activity ? "rgba(91, 255, 91,1)" : "rgba(0,0,0,0.2)" }}>
                        {item.code_membership}
                      </div>
                    </TableCell>
                    <TableCell>{item?.birthday}</TableCell>
                    <TableCell>{item?.address}</TableCell>
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
        <div className="box-pagination">
          <Pagination
            onChange={onChangeCurrent}
            current={current}
            defaultCurrent={1}
            showTitle={false}
            total={data?.total || 0}
            showLessItems
            showQuickJumper
            locale={"vi_VN"}
          />
        </div>
      </div>
    </MainLayout>
  );
};

const FormMember = props => {
  const dispatch = useDispatch();

  const listPosition = useSelector(state => state.positionRedux?.data);
  const listSpecialized = useSelector(state => state.specializedRedux?.data);
  const listClub = useSelector(state => state.clubRedux?.dataAllClub);

  const [data, setData] = useState({
    full_name: "",
    birthday: "",
    sex: "",
    status_activity: "",
    position_uid: "",
    specialized_uid: "",
    club_uid: "",
  });

  const onChange = (name, value) => {
    setData({ ...data, [name]: value });
  };
  const onChangeGender = value => {
    setData({ ...data, sex: value });
  };

  const onChangeStatus = value => {
    setData({ ...data, status_activity: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!data.full_name) {
      alert("Chưa nhập tên");
    } else if (!data.birthday) {
      alert("Chưa nhập ngày sinh");
    } else if (!data.sex) {
      alert("Chưa nhập giới tính");
    } else if (!data.specialized_uid) {
      alert("Chưa nhập tình trạng hoạt động");
    } else if (!data.position_uid) {
      alert("Chưa chọn chức vụ");
    } else if (!data.specialized_uid) {
      alert("Chưa chọn bậc chuyên môn");
    } else if (!data.club_uid) {
      alert("Chưa chọn câu lạc bộ");
    } else {
      dispatch(UserAction.createUser({ data: data }));
    }
  };

  useEffect(() => {
    if (!listPosition) {
      dispatch(PositionAction.getListPosition());
    }
  }, [listPosition]);

  useEffect(() => {
    if (!listSpecialized) {
      dispatch(SpecializedAction.getListSpecialized());
    }
  }, [listSpecialized]);

  useEffect(() => {
    if (!listClub) {
      dispatch(ClubAction.getAllClub());
    }
  }, [listClub]);

  return (
    <form className="form-member" onSubmit={onSubmit}>
      <Input
        label={LangConst.TXT_FULL_NAME}
        placeHolder={LangConst.TXT_INPUT_FULL_NAME}
        name="full_name"
        type="text"
        defaultValue={data?.full_name || ""}
        onInput={(nameText, value) => onChange(nameText, value)}
        requiredInput={true}
      />
      <Input
        label={LangConst.TXT_BIRTHDAY}
        placeHolder={LangConst.TXT_INPUT_FULL_NAME}
        name="birthday"
        type="date"
        defaultValue={data?.birthday || ""}
        onInput={(nameText, value) => onChange(nameText, value)}
        requiredInput={true}
      />
      <div className="form-radio">
        <Radio name="sex" onInput={index => onChangeGender(index)} uid="nam" value={true} content="Nam" />
        <Radio name="sex" onInput={index => onChangeGender(index)} uid="nu" value={false} content="Nữ" />
      </div>
      <div className="form-radio">
        <Radio
          name="status_activity"
          onInput={index => onChangeStatus(index)}
          uid="danghoatdong"
          value="1"
          content="Đang hoạt động"
        />
        <Radio
          name="status_activity"
          onInput={index => onChangeStatus(index)}
          uid="nghihoatdong"
          value="0"
          content="Nghỉ hoạt động"
        />
      </div>
      <div className="select-form">
        <SelectOption
          width="170px"
          defaultValue={LangConst.TXT_POSITION}
          listOption={listPosition?.data}
          nameText="position_uid"
          onInput={(nameText, value) => onChange(nameText, value)}
          content="position"
          value="uid"
        />
        <SelectOption
          width="170px"
          defaultValue={LangConst.TXT_PROFESSIONAL}
          listOption={listSpecialized?.data}
          nameText="specialized_uid"
          onInput={(nameText, value) => onChange(nameText, value)}
          content="professional_level"
          value="uid"
        />
        <SelectOption
          width="170px"
          defaultValue={LangConst.TXT_CLUB}
          listOption={listClub?.data}
          nameText="club_uid"
          onInput={(nameText, value) => onChange(nameText, value)}
          content="name_club"
          value="uid"
        />
      </div>
      <div className="footer-member">
        <Button type="submit" name="submit" />
      </div>
    </form>
  );
};

const branch = [
  { uid: "1xx", id: "1", Machihoi: "0601" },
  { uid: "1a", id: "2", Machihoi: "2401" },
  { uid: "2c", id: "3", Machihoi: "2702" },
  { uid: "3s", id: "4", Machihoi: "0803" },
  { uid: "4d", id: "5", Machihoi: "2603" },
  { uid: "5g", id: "6", Machihoi: "0704" },
  { uid: "6v", id: "7", Machihoi: "0805" },
  { uid: "7a", id: "8", Machihoi: "1406" },
  { uid: "8v", id: "9", Machihoi: "1908" },
  { uid: "9y", id: "10", Machihoi: "1510" },
  { uid: "10s", id: "11", Machihoi: "0112" },
  { uid: "11c", id: "12", Machihoi: "0512" },
];

export default ManageMember;
