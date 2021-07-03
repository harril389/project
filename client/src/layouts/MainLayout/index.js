import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PathConst, LangConst } from "const";
import { LogoutSVG, LockSVG, SuccessSVG } from "theme/icons";
import { DropDownMenu, Filter, DialogForm, InputText, Toast } from "components";
import { removeUserToken, getInfoUser, removeInfoUser } from "api/auth";
import { withRouter } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { checkPath } from "utils";
import { useSelector, useDispatch } from "react-redux";
import UserAction from "redux/user.redux";

const MainLayout = props => {
  const { name, children } = props;
  const currentPath = useLocation().pathname;
  const dispatch = useDispatch();
  const changePassSuccess = useSelector(state => state.userRedux?.changePassSuccess);
  const isChangePassSuccess = useSelector(state => state.userRedux?.changePassSuccess);

  const infoMember = JSON.parse(getInfoUser());

  const [changePass, setChangePass] = useState({
    password: "",
    newpassword: "",
    passwordConfirm: "",
  });

  const onChange = (name, value) => {
    setChangePass({ ...changePass, [name]: value });
  };
  const onCheckSuccess = () => {
    dispatch(UserAction.userSuccess({ isChangePassSuccess: false }));
  };

  const onSubmit = e => {
    e.preventDefault();
    if (changePass.newpassword !== changePass.passwordConfirm) {
      alert("Mật khẩu mới không khớp");
    } else if (changePass.password.length === 0) {
      alert("Chưa nhập mật khẩu cũ");
    } else if (changePass.newpassword.length === 0) {
      alert("Chưa nhập mật khẩu mới");
    } else if (changePass.passwordConfirm.length === 0) {
      alert("Chưa nhập xác nhận mật khẩu mới");
    } else {
      dispatch(UserAction.changePassMember(changePass));
    }
  };

  const logout = () => {
    removeUserToken();
    removeInfoUser();
    props.history.push(PathConst.LOGIN);
  };

  return (
    <div className="main-layout">
      <div className="scroll-navbar">
        <div className="navbar-layout">
          <div className="header-layout semiBold-xl-txt">
            <Link to={PathConst.HOME_PAGE} className="hmhn-text">
              HỘI MÁU HÀ NỘI
            </Link>
          </div>
          <DropDownMenu name="Hồ sơ tổ chức" listMenu={dataOrganizationalRecords} />
          <Link
            to={PathConst.INFORMATION_MEMBER}
            className={`link-text ${checkPath(currentPath, PathConst.INFORMATION_MEMBER) && "link-text-btn"}`}
          >
            Hồ sơ cá nhân
          </Link>
          <DropDownMenu name="Đánh giá năng lực" listMenu={dataExam} />
          {infoMember.role !== "member" && <DropDownMenu name="Admin" listMenu={dataAdmin} />}
        </div>
      </div>
      <div className="content">
        <div className="ml-header">
          <div className="toolbar">{name}</div>
          <div className="user">
            <div className="medium-md-txt name-user">{infoMember.username}</div>
            <Filter>
              <LogoutSVG onClick={logout} />
              {isChangePassSuccess && (
                <Toast
                  title={<SuccessSVG width="50px" height="50px" color="rgba(91, 255, 91,1)" />}
                  message={"Success"}
                  onChange={onCheckSuccess}
                />
              )}
              <DialogForm
                isIcon={true}
                title="Đổi mật khẩu"
                name={<LockSVG width="20px" height="20px" />}
                content={
                  <form onSubmit={onSubmit}>
                    <InputText
                      checkText={false}
                      icon={<LockSVG />}
                      notification="Nhập mật khẩu cũ!"
                      placeHolder={LangConst.TXT_OLD_PASSWORD}
                      name="password"
                      type="password"
                      defaultValue=""
                      onInput={(nameText, value) => onChange(nameText, value)}
                      requiredInput={true}
                    />
                    <InputText
                      checkText={false}
                      icon={<LockSVG />}
                      notification="Nhập mật khẩu mới!"
                      placeHolder={LangConst.TXT_NEW_PASSWORD}
                      name="newpassword"
                      type="password"
                      defaultValue=""
                      onInput={(nameText, value) => onChange(nameText, value)}
                      requiredInput={true}
                    />
                    <InputText
                      checkText={false}
                      icon={<LockSVG />}
                      notification="Nhập lại mật khẩu mới!"
                      placeHolder={LangConst.TXT_CONFIRM_NEW_PASSWORD}
                      name="passwordConfirm"
                      type="password"
                      defaultValue=""
                      onInput={(nameText, value) => onChange(nameText, value)}
                      requiredInput={true}
                    />
                    <div className="dialog-footer-form">
                      <button className="button-footer-form" type="submit">
                        {LangConst.TXT_CONFIRM}
                      </button>
                    </div>
                  </form>
                }
              />
            </Filter>
          </div>
        </div>
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};

const dataOrganizationalRecords = [
  {
    pathConst: PathConst.INTRO_BLOOD,
    name: "Giới thiệu về Hội",
    exception: [],
  },
  {
    pathConst: PathConst.HISTORY_BLOOD,
    name: "Lịch sử Hội",
    exception: [],
  },
  {
    pathConst: PathConst.LEADER_BlOOD,
    name: "Lãnh đạo qua các thời kỳ",
    exception: [],
  },
  {
    pathConst: PathConst.UNIT_RECORDS,
    name: "Hồ sơ đơn vị",
    exception: [],
  },
];

const dataExam = [
  {
    pathConst: PathConst.TOTAL_EXAM,
    name: "Kiểm tra",
    exception: [PathConst.EXAM_BLOOD],
  },
];

const dataAdmin = [
  {
    pathConst: PathConst.ADMIN_MANAGE_MEMBER,
    name: "Quản lý thành viên",
    exception: [],
  },
  {
    pathConst: PathConst.ADMIN_MANAGE_EXAM,
    name: "Quản lý đề thi",
    exception: [PathConst.ADMIN_MANAGE_QUESTION, PathConst.ADMIN_MANAGE_TYPE_QUESTION, PathConst.ADMIN_MANAGE_ANALYSIS],
  },
  {
    pathConst: PathConst.ADMIN_MANAGE_GROUP,
    name: "Quản lý Hội",
    exception: [PathConst.ADMIN_MANAGE_BRANCH, PathConst.ADMIN_MANAGE_CLUB],
  },
];
export default withRouter(MainLayout);
