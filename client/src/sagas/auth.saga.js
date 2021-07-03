import { ApiConst, AppConst } from "const";
import { call, put } from "redux-saga/effects";
import AuthAction from "redux/auth.redux";
import { AuthService } from "services";
import Cookies from "js-cookie";

export function* requestLogin(action) {
  try {
    const { data } = action;

    let response = yield call(AuthService.login, data);
    if (response.status === ApiConst.STT_OK) {
      let { token, uid, username, role } = response.data.data;
      Cookies.set(AppConst.KEY_TOKEN, token);
      Cookies.set(AppConst.KEY_INFO_USER, { uid: uid, username: username, role: role });
      yield put(AuthAction.loginSuccess());
    } else {
      yield put(AuthAction.loginFailure(response.data));
    }
  } catch (error) {
    yield put(AuthAction.loginFailure(error));
  }
}
