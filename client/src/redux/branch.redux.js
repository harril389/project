import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getListBranch: ["data"],
  getBranchByUid: ["data"],

  createBranch: ["data"],
  updateBranch: ["data"],

  branchSuccess: ["data"],
  branchFailure: ["data"],
});

export const BranchTypes = Types;

export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  isFetching: false,
  isSuccess: false,

  removeSuccess: false,
  createSuccess: false,

  data: null,
  dataByUid: null,
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
  [Types.GET_LIST_BRANCH]: request,
  [Types.GET_BRANCH_BY_UID]: request,
  [Types.CREATE_BRANCH]: request,
  [Types.UPDATE_BRANCH]: request,
  [Types.BRANCH_SUCCESS]: success,
  [Types.BRANCH_FAILURE]: failure,
};

export const reducer = createReducer(INITIAL_STATE, HANDLERS);
