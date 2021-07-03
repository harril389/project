import { call, put, select } from "redux-saga/effects";
import { ApiConst } from "const";
import { ClubService } from "services";
import ClubAction from "redux/club.redux";

export function* getClubByUid(action) {
  try {
    let response = yield call(ClubService.getClubByUid, action.data);
    if (response.status === ApiConst.STT_OK) {
      yield put(ClubAction.clubSuccess({ dataByUid: response.data.data }));
    } else {
      yield put(ClubAction.clubFailure(response.error));
    }
  } catch (error) {
    yield put(ClubAction.clubFailure(error));
  }
}

export function* getAllClub() {
  try {
    let response = yield call(ClubService.getAllClub);
    if (response.status === ApiConst.STT_OK) {
      yield put(ClubAction.clubSuccess({ dataAllClub: response.data }));
    } else {
      yield put(ClubAction.clubFailure(response.error));
    }
  } catch (error) {
    yield put(ClubAction.clubFailure(error));
  }
}

export function* getListClub(data) {
  try {
    let response = yield call(ClubService.getListClub, data);
    if (response.status === ApiConst.STT_OK) {
      yield put(ClubAction.clubSuccess({ data: response.data }));
    } else {
      yield put(ClubAction.clubFailure(response.error));
    }
  } catch (error) {
    yield put(ClubAction.clubFailure(error));
  }
}

export function* updateClub(action) {
  try {
    const {
      clubRedux: { data },
    } = yield select();
    let dataRedux = data.data;
    let response = yield call(ClubService.updateClub, action.data);
    if (response.status === ApiConst.STT_OK) {
      dataRedux.splice(
        dataRedux.findIndex(element => element.uid === response.data.data.uid),
        1,
        response.data.data,
      );
      let newData = { ...data, data: dataRedux };
      yield put(ClubAction.clubSuccess({ data: newData, createSuccess: true }));
    } else {
      yield put(ClubAction.clubFailure(response.error));
    }
  } catch (error) {
    yield put(ClubAction.clubFailure(error));
  }
}

export function* createClub(action) {
  try {
    const {
      clubRedux: { data },
    } = yield select();
    let dataRedux = data.data;
    let response = yield call(ClubService.createClub, action.data);
    if (response.status === ApiConst.STT_CREATED) {
      if (dataRedux.length < 10) {
        dataRedux.push(response.data.data);
        let newData = { ...data, data: dataRedux, total: data.total + 1 };
        yield put(ClubAction.clubSuccess({ data: newData, createSuccess: true }));
      } else {
        let newData = { ...data, total: data.total + 1 };
        yield put(ClubAction.clubSuccess({ data: newData, createSuccess: true }));
      }
    } else {
      yield put(ClubAction.clubFailure(response.error));
    }
  } catch (error) {
    yield put(ClubAction.clubFailure(error));
  }
}
