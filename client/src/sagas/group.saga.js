import { call, put, select } from "redux-saga/effects";
import { ApiConst } from "const";
import { GroupService } from "services";
import GroupAction from "redux/group.redux";

export function* uploadPDFHistory(action) {
  try {
    const { data } = action;
    let formData = new FormData();
    formData.append("pdf", data);
    let response = yield call(GroupService.uploadPDFHistory, formData);
    if (response.status === ApiConst.STT_OK) {
      yield put(GroupAction.groupSuccess({ uploadPDFSuccess: true }));
    } else {
      yield put(GroupAction.groupFailure(response.error));
    }
  } catch (error) {
    yield put(GroupAction.groupFailure(error));
  }
}

export function* uploadPDFIntroduction(action) {
  try {
    const { data } = action;
    let formData = new FormData();
    formData.append("pdf", data);
    let response = yield call(GroupService.uploadPDFIntroduction, formData);
    if (response.status === ApiConst.STT_OK) {
      yield put(GroupAction.groupSuccess({ uploadPDFSuccess: true }));
    } else {
      yield put(GroupAction.groupFailure(response.error));
    }
  } catch (error) {
    yield put(GroupAction.groupFailure(error));
  }
}

export function* getGroup() {
  try {
    let response = yield call(GroupService.getGroup);
    if (response.status === ApiConst.STT_OK) {
      yield put(GroupAction.groupSuccess({ data: response.data.data }));
    } else {
      yield put(GroupAction.groupFailure(response.error));
    }
  } catch (error) {
    yield put(GroupAction.groupFailure(error));
  }
}

export function* updateGroup(action) {
  try {
    let response = yield call(GroupService.updateGroup, action.data);
    if (response.status === ApiConst.STT_OK) {
      yield put(GroupAction.groupSuccess({ data: response.data.data, updateSuccess: true }));
    } else {
      yield put(GroupAction.groupFailure(response.error));
    }
  } catch (error) {
    yield put(GroupAction.groupFailure(error));
  }
}

export function* getLeader() {
  try {
    let response = yield call(GroupService.getLeader);
    if (response.status === ApiConst.STT_OK) {
      yield put(GroupAction.groupSuccess({ dataLeader: response.data.data }));
    } else {
      yield put(GroupAction.groupFailure(response.error));
    }
  } catch (error) {
    yield put(GroupAction.groupFailure(error));
  }
}
