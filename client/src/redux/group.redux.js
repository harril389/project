import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getGroup: ["data"],
  updateGroup: ["data"],
  uploadPDFHistory: ["data"],
  uploadPDFIntroduction: ["data"],

  getLeader: ["data"],
  groupSuccess: ["data"],
  groupFailure: ["data"],
});

export const GroupTypes = Types;

export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  isFetching: false,
  isSuccess: false,

  uploadPDFSuccess: false,
  updateSuccess: false,
  dataLeader: null,
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
  [Types.GET_GROUP]: request,
  [Types.GET_LEADER]: request,
  [Types.UPDATE_GROUP]: request,
  [Types.UPLOAD_PDF_HISTORY]: request,
  [Types.UPLOAD_PDF_INTRODUCTION]: request,
  [Types.GROUP_SUCCESS]: success,
  [Types.GROUP_FAILURE]: failure,
};

export const reducer = createReducer(INITIAL_STATE, HANDLERS);
