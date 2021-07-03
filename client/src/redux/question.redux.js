import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getListQuestion: ["data"],
  getListQuestionScroll: ["data"],
  getQuestion: ["data"],
  updateQuestion: ["data"],

  createQuestion: ["data"],

  questionSuccess: ["data"],
  questionFailure: ["data"],

  removeQuestion: ["data"],
  removeQuestionSuccess: ["data"],
  removeQuestionFailure: ["data"],
});

export const QuestionTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  isFetching: false,
  isSuccess: false,

  removeSuccess: false,
  createSuccess: false,

  removeFailure: false,
  createFailure: false,

  data: null,
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

export const failure = (state = INITIAL_STATE, action) => ({
  ...state,
  isFetching: false,
  isSuccess: false,
  error: action.error,
});

/* ------------- Mapping ------------- */
export const HANDLERS = {
  [Types.GET_LIST_QUESTION]: request,
  [Types.GET_LIST_QUESTION_SCROLL]: request,
  [Types.GET_QUESTION]: request,
  [Types.UPDATE_QUESTION]: request,
  [Types.CREATE_QUESTION]: request,
  [Types.QUESTION_SUCCESS]: success,
  [Types.QUESTION_FAILURE]: failure,
  [Types.REMOVE_QUESTION]: request,
  [Types.REMOVE_QUESTION_SUCCESS]: success,
  [Types.REMOVE_QUESTION_FAILURE]: failure,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);
