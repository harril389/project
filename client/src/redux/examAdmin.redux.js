import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getListExam: ["data"],
  getExamByUid: ["data"],

  createExam: ["data"],

  updateExam: ["data"],

  deleteExam: ["data"],

  examSuccess: ["data"],
  examFailure: ["data"],
});

export const ExamAdminTypes = Types;

export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  isFetching: false,
  isSuccess: false,
  data: null,
  removeSuccess: false,
  createSuccess: false,
  dataUid: null,
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

export const HANDLERS = {
  [Types.GET_LIST_EXAM]: request,
  [Types.GET_EXAM_BY_UID]: request,
  [Types.CREATE_EXAM]: request,
  [Types.UPDATE_EXAM]: request,
  [Types.DELETE_EXAM]: request,
  [Types.EXAM_SUCCESS]: success,
  [Types.EXAM_FAILURE]: failure,
};

export const reducer = createReducer(INITIAL_STATE, HANDLERS);
