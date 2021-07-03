import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  // getListQuestion: ["data"],
  // getListQuestionScroll: ["data"],
  getMember: ["data"],
  // updateQuestion: ["data"],
  getListUser: ["data"],

  createUser: ["data"],

  updateMember: ["Data"],

  updateMemberAdmin: ["data"],

  userSuccess: ["data"],
  userFailure: ["data"],

  uploadAvatar: ["data"],

  changePassMember: ["data"],

  forgotPassMember: ["data"],

  newPasswordMember: ["data"],

  // removeQuestion: ["data"],
  // removeQuestionSuccess: ["data"],
  // removeQuestionFailure: ["data"],
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  isFetching: false,
  isSuccess: false,

  removeFailure: false,
  createFailure: false,

  data: null,
  image: null,
  dataCreate: null,
  dataMember: null,

  changePassSuccess: null,
  isChangePassSuccess: false,
  isForgotPass: false,

  isUpdateUserMemberSuccess: false,

  isNewPassSuccess: false,

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
  [Types.GET_LIST_USER]: request,
  // [Types.GET_LIST_QUESTION_SCROLL]: request,
  [Types.GET_MEMBER]: request,
  [Types.UPDATE_MEMBER]: request,
  [Types.UPDATE_MEMBER_ADMIN]: request,
  [Types.CREATE_USER]: request,
  [Types.USER_SUCCESS]: success,
  [Types.USER_FAILURE]: failure,
  [Types.UPLOAD_AVATAR]: request,
  [Types.CHANGE_PASS_MEMBER]: request,
  [Types.FORGOT_PASS_MEMBER]: request,
  [Types.NEW_PASSWORD_MEMBER]: request,
  // [Types.REMOVE_QUESTION_SUCCESS]: success,
  // [Types.REMOVE_QUESTION_FAILURE]: failure,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);
