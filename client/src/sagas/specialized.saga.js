import { call, put } from "redux-saga/effects";
import { SpecializedService } from "services";
import SpecializedAction from "redux/specialized.redux";
import { ApiConst } from "const";

export function* getListSpecialized() {
  try {
    let response = yield call(SpecializedService.getListSpecialized);
    if (response.status === ApiConst.STT_OK) {
      yield put(SpecializedAction.specializedSuccess({ data: response.data }));
    } else {
      yield put(SpecializedAction.specializedFailure(response.error));
    }
  } catch (error) {
    yield put(SpecializedAction.specializedFailure(error));
  }
}

// export function* removeQuestion(action) {}

// export function* updatePosition(action) {}

// export function* createPosition(action) {}
