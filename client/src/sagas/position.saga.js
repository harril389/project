import { call, put, select } from "redux-saga/effects";
import { PositionService } from "services";
import PositionAction from "redux/position.redux";
import { ApiConst } from "const";

export function* getListPosition() {
  try {
    let response = yield call(PositionService.getListPosition);
    if (response.status === ApiConst.STT_OK) {
      yield put(PositionAction.positionSuccess({ data: response.data }));
    } else {
      yield put(PositionAction.positionFailure(response.error));
    }
  } catch (error) {
    yield put(PositionAction.positionFailure(error));
  }
}

export function* removeQuestion(action) {}

export function* updatePosition(action) {}

export function* createPosition(action) {}
