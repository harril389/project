import React, { useEffect, useState } from "react";
import { LangConst, AppConst, PathConst } from "const";
import { InputText } from "./Form/Input";
import { LockSVG } from "theme/icons";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import UserAction from "redux/user.redux";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const ResetPassword = props => {
  const { token } = props.match.params;
  const isNewPassSuccess = useSelector(state => state.userRedux?.isNewPassSuccess);
  const history = useHistory();

  // console.log(token);
  useEffect(() => {
    Cookies.set(AppConst.KEY_TOKEN_NEW_PASS, token);
  }, []);

  const dispatch = useDispatch();
  const [data, setData] = useState({
    newpassword: "",
    passwordConfirm: "",
  });

  const onChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(UserAction.newPasswordMember(data));
  };

  const invalidToken = true;

  useEffect(() => {
    if (isNewPassSuccess) {
      Cookies.remove(AppConst.KEY_TOKEN_NEW_PASS);
      dispatch(UserAction.userSuccess({ isNewPassSuccess: false }));
      history.push({ pathname: PathConst.LOGIN });
    }
  }, [isNewPassSuccess]);

  return (
    <>
      {invalidToken ? (
        <>
          <div className="body-change-pass-form">
            <div className="border-content">
              <div className="title-change-pass">Cập nhật mật khẩu</div>
              <form className="content-right-change-pass" onSubmit={onSubmit}>
                <InputText
                  checkText={false}
                  icon={<LockSVG />}
                  notification="Nhập pass!"
                  placeHolder={LangConst.TXT_NEW_PASSWORD}
                  name="newpassword"
                  type="password"
                  defaultValue=""
                  onInput={(nameText, value) => onChange(nameText, value)}
                />
                <InputText
                  checkText={false}
                  icon={<LockSVG />}
                  notification="Nhập pass!"
                  placeHolder={LangConst.TXT_CONFIRM_NEW_PASSWORD}
                  name="passwordConfirm"
                  type="password"
                  defaultValue=""
                  onInput={(nameText, value) => onChange(nameText, value)}
                />
                <Button type="submit" color="rgba(0, 198, 212, 1)" width="100%" name={LangConst.TXT_UPDATE_AT} />
              </form>
            </div>
          </div>
        </>
      ) : (
        <div>
          <p>Yêu cầu đổi mật khẩu của bạn đã hết hạn</p>
          <a href="/login">Quay về trang đăng nhập</a>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
