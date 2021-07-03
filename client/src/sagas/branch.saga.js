import { call, put, select } from "redux-saga/effects";
import { ApiConst } from "const";
import { BranchService } from "services";
import BranchAction from "redux/branch.redux";

export function* getBranchByUid(action) {
  try {
    let response = yield call(BranchService.getBranchByUid, action.data);
    if (response.status === ApiConst.STT_OK) {
      yield put(BranchAction.branchSuccess({ dataByUid: response.data.data }));
    } else {
      yield put(BranchAction.branchFailure(response.error));
    }
  } catch (error) {
    yield put(BranchAction.branchFailure(error));
  }
}

export function* getListBranch() {
  try {
    let response = yield call(BranchService.getListBranch);
    if (response.status === ApiConst.STT_OK) {
      yield put(BranchAction.branchSuccess({ data: response.data }));
    } else {
      yield put(BranchAction.branchFailure(response.error));
    }
  } catch (error) {
    yield put(BranchAction.branchFailure(error));
  }
}

export function* updateBranch(action) {
  try {
    const {
      branchRedux: { data },
    } = yield select();
    let dataRedux = data.data;
    let response = yield call(BranchService.updateBranch, action.data);
    if (response.status === ApiConst.STT_OK) {
      dataRedux.splice(
        dataRedux.findIndex(element => element.uid === response.data.data.uid),
        1,
        response.data.data,
      );
      let newData = { ...data, data: dataRedux };
      yield put(BranchAction.branchSuccess({ data: newData, createSuccess: true }));
    } else {
      yield put(BranchAction.branchFailure(response.error));
    }
  } catch (error) {
    yield put(BranchAction.branchFailure(error));
  }
}

export function* createBranch(action) {
  try {
    const {
      branchRedux: { data },
    } = yield select();
    let dataRedux = data.data;
    let response = yield call(BranchService.createBranch, action.data);
    if (response.status === ApiConst.STT_CREATED) {
      if (dataRedux.length < 10) {
        dataRedux.push(response.data.data);
        let newData = { ...data, data: dataRedux, total: data.total + 1 };
        yield put(BranchAction.branchSuccess({ data: newData, createSuccess: true }));
      } else {
        let newData = { ...data, total: data.total + 1 };
        yield put(BranchAction.branchSuccess({ data: newData, createSuccess: true }));
      }
    } else {
      yield put(BranchAction.branchFailure(response.error));
    }
  } catch (error) {
    yield put(BranchAction.branchFailure(error));
  }
}
