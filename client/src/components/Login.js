import React, { useEffect, useState } from "react";
import { InputText } from "./Form/Input";
import { UserSVG, LockSVG } from "theme/icons";
import { LangConst, PathConst } from "const";
import Button from "./Button";
import { Redirect } from "react-router-dom";
import { getUserToken } from "api/auth";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AuthAction from "redux/auth.redux";
import { DialogChange } from "./dialog";
import UserAction from "redux/user.redux";

const Login = props => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isLoginSuccess = useSelector(state => state.authRedux.isLogin);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [pass, setPass] = useState({
    username: "",
  });

  const onChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const onChangePass = (name, value) => {
    setPass({ ...pass, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    dispatch(AuthAction.requestLogin(data));
  };

  const onSubmitPass = e => {
    e.preventDefault();
    dispatch(UserAction.forgotPassMember(pass));
  };

  useEffect(() => {
    if (isLoginSuccess) {
      setLoading(false);
      history.push({ pathname: PathConst.HOME_PAGE });
    }
  }, [history, isLoginSuccess]);

  useEffect(() => {
    let checkUserToken = getUserToken();
    if (checkUserToken) {
      history.push({ pathname: PathConst.HOME_PAGE });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="para-login">
      <div className="content">
        <div className="left-content">
          <div className="main">
            <div className="title">{LangConst.TXT_GROUP_BLOOD}</div>
            <div className="paragraph">{LangConst.TXT_SLOGAN}</div>
          </div>
        </div>
        <div className="right-content">
          <div className="logo">
            <img src="/logomau.png" alt="logo"></img>
          </div>
          <form onSubmit={onSubmit}>
            <InputText
              checkText={false}
              icon={<UserSVG />}
              notification="Nhập username!"
              placeHolder="username"
              name="username"
              type="text"
              defaultValue=""
              onInput={(nameText, value) => onChange(nameText, value)}
            />
            <InputText
              checkText={false}
              icon={<LockSVG />}
              notification="Nhập pass!"
              placeHolder="password"
              name="password"
              type="password"
              defaultValue=""
              onInput={(nameText, value) => onChange(nameText, value)}
            />
            <Button type="submit" color="rgba(0, 198, 212, 1)" width="100%" name={LangConst.TXT_LOGIN} />
          </form>
          <div className="forgot-pass">
            {/* <a className="regular-md-txt">{LangConst.TXT_FORGOT_PASSWORD}</a> */}
            <DialogChange
              isIcon={true}
              title={LangConst.TXT_CHANGE_PASS}
              name={LangConst.TXT_CHANGE_PASS}
              content={
                <form onSubmit={onSubmitPass}>
                  <InputText
                    checkText={false}
                    icon={<UserSVG />}
                    notification="Nhập id!"
                    placeHolder="Nhập Id người dùng"
                    name="username"
                    type="text"
                    defaultValue=""
                    onInput={(nameText, value) => onChangePass(nameText, value)}
                  />
                  <div className="dialog-footer-form">
                    <button className="button-footer-form" type="submit">
                      {LangConst.TXT_CONFIRM}
                    </button>
                  </div>
                </form>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
