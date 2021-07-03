import { call, put, select } from "redux-saga/effects";
import { QuestionService } from "services";
import QuestionAction from "redux/question.redux";
import { ApiConst } from "const";

export function* getListQuestion(data) {
  try {
    let response = yield call(QuestionService.getListQuestion, data);
    if (response.status === ApiConst.STT_OK) {
      yield put(QuestionAction.questionSuccess({ data: response.data }));
    } else {
      yield put(QuestionAction.questionFailure(response.error));
    }
  } catch (error) {
    yield put(QuestionAction.questionFailure(error));
  }
}

export function* getListQuestionScroll(action) {
  try {
    const {
      questionRedux: { data },
    } = yield select();
    let dataRedux = data.data;
    let response = yield call(QuestionService.getListQuestion, action);
    if (response.status === ApiConst.STT_OK) {
      const mergeData = [...dataRedux, ...response.data.data];
      let newData = { ...data, data: mergeData };
      yield put(QuestionAction.questionSuccess({ data: newData }));
    } else {
      yield put(QuestionAction.questionFailure(response.error));
    }
  } catch (error) {
    yield put(QuestionAction.questionFailure(error));
  }
}

export function* removeQuestion(action) {
  try {
    let response = yield call(QuestionService.removeQuestion, action);
    if (response.status === ApiConst.STT_OK) {
      yield getListQuestion(action);
      yield put(QuestionAction.removeQuestionSuccess({ removeSuccess: true }));
    } else {
      yield put(QuestionAction.removeQuestionFailure(response.error));
    }
  } catch (error) {
    yield put(QuestionAction.removeQuestionFailure(error));
  }
}

export function* updateQuestion(action) {
  try {
    const {
      questionRedux: { data },
    } = yield select();
    let dataRedux = data.data;
    let response = yield call(QuestionService.updateQuestion, action.data);
    if (response.status === ApiConst.STT_OK) {
      dataRedux.splice(
        dataRedux.findIndex(element => element.uid === response.data.data.uid),
        1,
        response.data.data,
      );
      let newData = { ...data, data: dataRedux };
      yield put(QuestionAction.questionSuccess({ data: newData, createSuccess: true }));
    } else {
      yield put(QuestionAction.questionFailure(response.error));
    }
  } catch (error) {
    yield put(QuestionAction.questionFailure(error));
  }
}

export function* createQuestion(action) {
  try {
    const {
      questionRedux: { data },
    } = yield select();
    let dataRedux = data.data;
    let response = yield call(QuestionService.createQuestion, action.data);
    if (response.status === ApiConst.STT_CREATED) {
      if (dataRedux.length < 10) {
        dataRedux.push(response.data.data);
        let newData = { ...data, data: dataRedux, total: data.total + 1 };
        yield put(QuestionAction.questionSuccess({ data: newData, createSuccess: true }));
      } else {
        let newData = { ...data, total: data.total + 1 };
        yield put(QuestionAction.questionSuccess({ data: newData, createSuccess: true }));
      }
    } else {
      yield put(QuestionAction.questionFailure(response.error));
    }
  } catch (error) {
    yield put(QuestionAction.questionFailure(error));
  }
}
