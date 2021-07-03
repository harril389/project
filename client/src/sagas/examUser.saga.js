import { call, put } from "redux-saga/effects";
import { ExamUserService } from "services";
import ExamUserAction from "redux/examUser.redux";
import { ApiConst } from "const";

export function* getListExamUser(data) {
  try {
    let response = yield call(ExamUserService.getListExamUser, data);
    if (response.status === ApiConst.STT_OK) {
      yield put(ExamUserAction.examUserSuccess({ data: response.data }));
    } else {
      yield put(ExamUserAction.examUserFailure(response.error));
    }
  } catch (error) {
    yield put(ExamUserAction.examUserFailure(error));
  }
}

export function* checkPass(data) {
  try {
    let response = yield call(ExamUserService.checkPass, data);
    if (response.status === ApiConst.STT_OK) {
      yield put(ExamUserAction.examUserSuccess({ dataExam: response.data.data, getPassSuccess: true }));
    } else {
      yield put(ExamUserAction.getPassUserFailure(response.data));
    }
  } catch (error) {
    yield put(ExamUserAction.examUserFailure(error));
  }
}

export function* createAnswer(data) {
  try {
    let response = yield call(ExamUserService.createAnswer, data);
    if (response.status === ApiConst.STT_OK) {
      yield put(ExamUserAction.examUserSuccess({ dataAnswer: response.data.data, postAnswerSuccess: true }));
    } else {
      yield put(ExamUserAction.examUserFailure(response.error));
    }
  } catch (error) {
    yield put(ExamUserAction.examUserFailure(error));
  }
}
