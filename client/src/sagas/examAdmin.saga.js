import { call, put, select } from "redux-saga/effects";
import { ExamAdminService } from "services";
import ExamAction from "redux/examAdmin.redux";
import { ApiConst } from "const";

export function* getListExam(data) {
  try {
    let response = yield call(ExamAdminService.getListExam, data);
    if (response.status === ApiConst.STT_OK) {
      yield put(ExamAction.examSuccess({ data: response.data }));
    } else {
      yield put(ExamAction.examFailure(response.error));
    }
  } catch (error) {
    yield put(ExamAction.examFailure(error));
  }
}

export function* getExamByUid(data) {
  try {
    let response = yield call(ExamAdminService.getExamByUid, data);
    if (response.status === ApiConst.STT_OK) {
      yield put(ExamAction.examSuccess({ dataUid: response.data.data }));
    } else {
      yield put(ExamAction.examFailure(response.error));
    }
  } catch (error) {
    yield put(ExamAction.examFailure(error));
  }
}

export function* createExam(action) {
  try {
    const {
      examAdminRedux: { data },
    } = yield select();
    let dataRedux = data.data;
    let response = yield call(ExamAdminService.createExam, action.data);
    if (response.status === ApiConst.STT_CREATED) {
      if (dataRedux.length < 10) {
        dataRedux.push(response.data.data);
        let newData = { ...data, data: dataRedux, total: data.total + 1 };
        yield put(ExamAction.examSuccess({ data: newData, createSuccess: true }));
      } else {
        let newData = { ...data, total: data.total + 1 };
        yield put(ExamAction.examSuccess({ data: newData, createSuccess: true }));
      }
    } else {
      yield put(ExamAction.examFailure(response.error));
    }
  } catch (error) {
    yield put(ExamAction.examFailure(error));
  }
}

export function* updateExam(action) {
  try {
    const {
      examAdminRedux: { data },
    } = yield select();
    let dataRedux = data.data;
    let response = yield call(ExamAdminService.updateExam, action.data);
    if (response.status === ApiConst.STT_OK) {
      dataRedux.splice(
        dataRedux.findIndex(element => element.uid === response.data.data.uid),
        1,
        response.data.data,
      );
      let newData = { ...data, data: dataRedux };
      yield put(ExamAction.examSuccess({ data: newData, createSuccess: true }));
    } else {
      yield put(ExamAction.examFailure(response.error));
    }
  } catch (error) {
    yield put(ExamAction.examFailure(error));
  }
}

export function* deleteExam(action) {
  try {
    let response = yield call(ExamAdminService.removeExam, action);
    if (response.status === ApiConst.STT_OK) {
      yield getListExam(action);
      yield put(ExamAction.examSuccess({ removeSuccess: true }));
    } else {
      yield put(ExamAction.examFailure(response.error));
    }
  } catch (error) {
    yield put(ExamAction.examFailure(error));
  }
}
