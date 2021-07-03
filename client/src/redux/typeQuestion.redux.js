import { createReducer, createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  getListTypeQuestion: ["data"],
  getListTypeQuestionSuccess: ["data"],
  getListTypeQuestionFailure: ["data"],
  createTypeQuestion: ["data"],
  removeTypeQuestion: ["data"],
  updateTypeQuestion: ["data"],
});

export const TypeQuestionTypes = Types;
export default Creators;

export const INITIAL_STATE = {
  isFetching: false,
  isSuccess: false,

  removeSuccess: false,
  createSuccess: false,

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

export const failure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isFetching: false,
    isSuccess: false,
    error: action.error,
  };
};

export const HANDLERS = {
  [Types.GET_LIST_TYPE_QUESTION]: request,
  [Types.CREATE_TYPE_QUESTION]: request,
  [Types.REMOVE_TYPE_QUESTION]: request,
  [Types.UPDATE_TYPE_QUESTION]: request,
  [Types.GET_LIST_TYPE_QUESTION_SUCCESS]: success,
  [Types.GET_LIST_TYPE_QUESTION_FAILURE]: failure,
};

export const reducer = createReducer(INITIAL_STATE, HANDLERS);
