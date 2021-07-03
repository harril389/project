import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getListClub: ["data"],
  getClubByUid: ["data"],

  getAllClub: ["data"],

  updateClub: ["data"],
  createClub: ["data"],

  clubSuccess: ["data"],
  clubFailure: ["data"],
});

export const ClubTypes = Types;

export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  isFetching: false,
  isSuccess: false,
  data: null,
  dataByUid: null,
  dataAllClub: null,
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
  [Types.GET_LIST_CLUB]: request,
  [Types.GET_CLUB_BY_UID]: request,
  [Types.GET_ALL_CLUB]: request,
  [Types.UPDATE_CLUB]: request,
  [Types.CREATE_CLUB]: request,
  [Types.CLUB_SUCCESS]: success,
  [Types.CLUB_FAILURE]: failure,
};

export const reducer = createReducer(INITIAL_STATE, HANDLERS);
