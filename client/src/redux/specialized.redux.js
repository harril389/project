import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getListSpecialized: ["data"],

  specializedSuccess: ["data"],
  specializedFailure: ["data"],
});

export const SpecializedTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  isFetching: false,
  isSuccess: false,

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
  [Types.GET_LIST_SPECIALIZED]: request,
  [Types.SPECIALIZED_SUCCESS]: success,
  [Types.SPECIALIZED_FAILURE]: failure,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);
