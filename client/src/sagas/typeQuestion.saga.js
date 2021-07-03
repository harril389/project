import { call, put, select } from "redux-saga/effects";
import { TypeQuestionService } from "services";
import TypeQuestionAction from "redux/typeQuestion.redux";
import { ApiConst } from "const";

export function* getListTypeQuestion(action) {
  try {
    let response = yield call(TypeQuestionService.getListTypeQuestion, action);
    if (response.status === ApiConst.STT_OK) {
      yield put(TypeQuestionAction.getListTypeQuestionSuccess({ data: response.data }));
    } else {
      yield put(TypeQuestionAction.getListTypeQuestionFailure(response.error));
    }
  } catch (error) {
    yield put(TypeQuestionAction.getListTypeQuestionFailure(error));
  }
}

export function* createTypeQuestion(action) {
  try {
    const {
      typeQuestionRedux: { data },
    } = yield select();
    let dataRedux = data.data;
    let response = yield call(TypeQuestionService.createTypeQuestion, action.data);
    if (response.status === ApiConst.STT_CREATED) {
      if (dataRedux.length < 10) {
        dataRedux.push(response.data.data);
        let newData = { ...data, data: dataRedux, total: data.total + 1 };
        yield put(TypeQuestionAction.getListTypeQuestionSuccess({ data: newData, createSuccess: true }));
      } else {
        let newData = { ...data, total: data.total + 1 };
        yield put(TypeQuestionAction.getListTypeQuestionSuccess({ data: newData, createSuccess: true }));
      }
    } else {
      yield put(TypeQuestionAction.getListTypeQuestionFailure(response.error));
    }
  } catch (error) {
    yield put(TypeQuestionAction.getListTypeQuestionFailure(error));
  }
}

export function* removeTypeQuestion(action) {
  try {
    let response = yield call(TypeQuestionService.removeTypeQuestion, action);
    if (response.status === ApiConst.STT_OK) {
      yield getListTypeQuestion(action);
      yield put(TypeQuestionAction.getListTypeQuestionSuccess({ removeSuccess: true }));
    } else {
      yield put(TypeQuestionAction.getListTypeQuestionFailure(response.error));
    }
  } catch (error) {
    yield put(TypeQuestionAction.getListTypeQuestionFailure(error));
  }
}

export function* updateTypeQuestion(action) {
  try {
    const {
      typeQuestionRedux: { data },
    } = yield select();
    let dataRedux = data.data;
    let response = yield call(TypeQuestionService.updateTypeQuestion, action.data);
    if (response.status === ApiConst.STT_OK) {
      dataRedux.splice(
        dataRedux.findIndex(element => element.uid === response.data.data.uid),
        1,
        response.data.data,
      );
      let newData = { ...data, data: dataRedux };
      yield put(TypeQuestionAction.getListTypeQuestionSuccess({ data: newData, createSuccess: true }));
    } else {
      yield put(TypeQuestionAction.getListTypeQuestionFailure(response.error));
    }
  } catch (error) {
    yield put(TypeQuestionAction.getListTypeQuestionFailure(error));
  }
}
