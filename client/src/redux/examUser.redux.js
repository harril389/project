import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getListExamUser: ["data"],
  getExamByUidUser: ["data"],
  checkPass: ["data"],

  createAnswer: ["data"],

  examUserSuccess: ["data"],
  examUserFailure: ["data"],

  getPassUserSuccess: ["data"],
  getPassUserFailure: ["data"],
});

export const ExamUserTypes = Types;

export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  isFetching: false,
  isSuccess: false,
  data: null,
  dataUid: null,
  dataExam: null,
  dataAnswer: null,
  getPassSuccess: false,
  postAnswerSuccess: false,

  isGetPassFailure: false,
  errorCheckPass: null,
  error: null,
};

export const request = (state = INITIAL_STATE) => {
  return {
    ...state,
    isFetching: true,
  };
};

export const success = (state = INITIAL_STATE, action) => {
  const data = action.data || {};
  return {
    ...state,
    isFetching: false,
    isSuccess: true,
    ...data,
  };
};

export const failure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isFetching: false,
    isSuccess: false,
    error: action.error,
  };
};

export const getPassFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isFetching: false,
    isSuccess: false,
    getPassSuccess: false,
    isGetPassFailure: true,
    errorCheckPass: action.data,
  };
};

export const HANDLERS = {
  [Types.GET_LIST_EXAM_USER]: request,
  [Types.GET_EXAM_BY_UID_USER]: request,
  [Types.CHECK_PASS]: request,
  [Types.CREATE_ANSWER]: request,
  [Types.EXAM_USER_SUCCESS]: success,
  [Types.EXAM_USER_FAILURE]: failure,
  [Types.GET_PASS_USER_SUCCESS]: success,
  [Types.GET_PASS_USER_FAILURE]: getPassFailure,
};

export const reducer = createReducer(INITIAL_STATE, HANDLERS);
