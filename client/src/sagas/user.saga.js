import { call, put } from "redux-saga/effects";
import { UserService } from "services";
import UserAction from "redux/user.redux";
import { ApiConst } from "const";

export function* createUser(action) {
  try {
    let response = yield call(UserService.createUser, action.data);
    if (response.status === ApiConst.STT_OK) {
      yield put(UserAction.userSuccess({ dataCreate: response.data }));
    } else {
      yield put(UserAction.userFailure(response.error));
    }
  } catch (error) {
    yield put(UserAction.userFailure(error));
  }
}

export function* getListUser(data) {
  try {
    let response = yield call(UserService.getListUser, data);
    if (response.status === ApiConst.STT_OK) {
      yield put(UserAction.userSuccess({ data: response.data }));
    } else {
      yield put(UserAction.userFailure(response.error));
    }
  } catch (error) {
    yield put(UserAction.userFailure(error));
  }
}

export function* getMember(data) {
  try {
    let response = yield call(UserService.getMember, data);
    if (response.status === ApiConst.STT_OK) {
      yield put(UserAction.userSuccess({ dataMember: response.data.data }));
    } else {
      yield put(UserAction.userFailure(response.error));
    }
  } catch (error) {
    yield put(UserAction.userFailure(error));
  }
}

export function* uploadAvatar(action) {
  try {
    const { data } = action;
    let formData = new FormData();
    formData.append("avatar", data);
    let response = yield call(UserService.uploadAvatar, formData);
    if (response.status === ApiConst.STT_OK) {
      yield put(UserAction.userSuccess({ image: response.data.data }));
    } else {
      yield put(UserAction.userFailure(response.error));
    }
  } catch (error) {
    yield put(UserAction.userFailure(error));
  }
}

export function* changePassMember(action) {
  try {
    let response = yield call(UserService.changePassMember, action.data);
    if (response.status === ApiConst.STT_OK) {
      yield put(UserAction.userSuccess({ changePassSuccess: response.data.message, isChangePassSuccess: true }));
    } else {
      yield put(UserAction.userFailure(response.error));
    }
  } catch (error) {
    yield put(UserAction.userFailure(error));
  }
}

export function* forgotPassMember(action) {
  try {
    let response = yield call(UserService.forgotPassMember, action.data);
    if (response.status === ApiConst.STT_OK) {
      yield put(UserAction.userSuccess({ isForgotPass: true }));
    } else {
      yield put(UserAction.userFailure(response.error));
    }
  } catch (error) {
    yield put(UserAction.userFailure(error));
  }
}

export function* newPasswordMember(action) {
  try {
    let response = yield call(UserService.newPasswordMember, action.data);
    if (response.status === ApiConst.STT_OK) {
      yield put(UserAction.userSuccess({ isNewPassSuccess: true }));
    } else {
      yield put(UserAction.userFailure(response.error));
    }
  } catch (error) {
    yield put(UserAction.userFailure(error));
  }
}

export function* updateUserMember(action) {
  try {
    console.log(action.Data.data);
    let response = yield call(UserService.updateUserMember, action.Data);
    if (response.status === ApiConst.STT_OK) {
      yield put(UserAction.userSuccess({ dataMember: response.data.data, isUpdateUserMemberSuccess: true }));
    } else {
      yield put(UserAction.userFailure(response.error));
    }
  } catch (error) {
    yield put(UserAction.userFailure(error));
  }
}

export function* updateMemberAdmin(action) {
  try {
    let response = yield call(UserService.updateMemberAdmin, action.data);
    yield put(UserAction.userSuccess({ isUpdateUserMemberSuccess: true }));
    yield getListUser({
      data: {
        paging: 1,
        size: 10,
        page: 1,
        full_name: "",
        blood_group: "",
        address: "",
        birthday: "",
        club_uid: "",
      },
    });
    if (response.status === ApiConst.STT_OK) {
      // console.log(response.data);
      // yield put(UserAction.userSuccess({ dataMember: response.data.data }));
    } else {
      yield put(UserAction.userFailure(response.error));
    }
  } catch (error) {
    yield put(UserAction.userFailure(error));
  }
}
