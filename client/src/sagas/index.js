import { takeLatest, all } from "redux-saga/effects";

import { AuthTypes } from "redux/auth.redux";
import { QuestionTypes } from "redux/question.redux";
import { TypeQuestionTypes } from "redux/typeQuestion.redux";
import { ExamAdminTypes } from "redux/examAdmin.redux";
import { ClubTypes } from "redux/club.redux";
import { BranchTypes } from "redux/branch.redux";
import { PositionTypes } from "redux/position.redux";
import { SpecializedTypes } from "redux/specialized.redux";
import { UserTypes } from "redux/user.redux";
import { ExamUserTypes } from "redux/examUser.redux";
import { GroupTypes } from "redux/group.redux";

import {
  getListQuestion,
  removeQuestion,
  updateQuestion,
  createQuestion,
  getListQuestionScroll,
} from "./question.saga";
import { getListTypeQuestion, createTypeQuestion, removeTypeQuestion, updateTypeQuestion } from "./typeQuestion.saga";

import { getListExam, getExamByUid, createExam, updateExam, deleteExam } from "./examAdmin.saga";

import { getClubByUid, getAllClub, getListClub, updateClub, createClub } from "./club.saga";

import { getBranchByUid, getListBranch, updateBranch, createBranch } from "./branch.saga";

import { requestLogin } from "./auth.saga";

import { getListPosition } from "./position.saga";

import { getListSpecialized } from "./specialized.saga";

import {
  createUser,
  getListUser,
  getMember,
  uploadAvatar,
  changePassMember,
  forgotPassMember,
  newPasswordMember,
  updateUserMember,
  updateMemberAdmin,
} from "./user.saga";

import { getListExamUser, checkPass, createAnswer } from "./examUser.saga";

import { uploadPDFIntroduction, uploadPDFHistory, getGroup, updateGroup, getLeader } from "./group.saga";

export default function* root() {
  yield all([
    // login
    takeLatest(AuthTypes.REQUEST_LOGIN, requestLogin),

    // question
    takeLatest(QuestionTypes.GET_LIST_QUESTION, getListQuestion),
    takeLatest(QuestionTypes.GET_LIST_QUESTION_SCROLL, getListQuestionScroll),
    takeLatest(QuestionTypes.REMOVE_QUESTION, removeQuestion),
    takeLatest(QuestionTypes.UPDATE_QUESTION, updateQuestion),
    takeLatest(QuestionTypes.CREATE_QUESTION, createQuestion),
    // type question
    takeLatest(TypeQuestionTypes.GET_LIST_TYPE_QUESTION, getListTypeQuestion),
    takeLatest(TypeQuestionTypes.CREATE_TYPE_QUESTION, createTypeQuestion),
    takeLatest(TypeQuestionTypes.REMOVE_TYPE_QUESTION, removeTypeQuestion),
    takeLatest(TypeQuestionTypes.UPDATE_TYPE_QUESTION, updateTypeQuestion),

    //exam admin
    takeLatest(ExamAdminTypes.GET_LIST_EXAM, getListExam),
    takeLatest(ExamAdminTypes.GET_EXAM_BY_UID, getExamByUid),
    takeLatest(ExamAdminTypes.CREATE_EXAM, createExam),
    takeLatest(ExamAdminTypes.UPDATE_EXAM, updateExam),
    takeLatest(ExamAdminTypes.DELETE_EXAM, deleteExam),

    // club
    takeLatest(ClubTypes.GET_CLUB_BY_UID, getClubByUid),
    takeLatest(ClubTypes.GET_ALL_CLUB, getAllClub),
    takeLatest(ClubTypes.GET_LIST_CLUB, getListClub),
    takeLatest(ClubTypes.UPDATE_CLUB, updateClub),
    takeLatest(ClubTypes.CREATE_CLUB, createClub),

    // branch
    takeLatest(BranchTypes.GET_BRANCH_BY_UID, getBranchByUid),
    takeLatest(BranchTypes.GET_LIST_BRANCH, getListBranch),
    takeLatest(BranchTypes.UPDATE_BRANCH, updateBranch),
    takeLatest(BranchTypes.CREATE_BRANCH, createBranch),

    // position
    takeLatest(PositionTypes.GET_LIST_POSITION, getListPosition),

    // specialized
    takeLatest(SpecializedTypes.GET_LIST_SPECIALIZED, getListSpecialized),

    // user admin
    takeLatest(UserTypes.CREATE_USER, createUser),
    takeLatest(UserTypes.GET_LIST_USER, getListUser),
    takeLatest(UserTypes.UPLOAD_AVATAR, uploadAvatar),
    takeLatest(UserTypes.UPDATE_MEMBER_ADMIN, updateMemberAdmin),

    // member
    takeLatest(UserTypes.GET_MEMBER, getMember),
    takeLatest(UserTypes.CHANGE_PASS_MEMBER, changePassMember),
    takeLatest(UserTypes.FORGOT_PASS_MEMBER, forgotPassMember),
    takeLatest(UserTypes.NEW_PASSWORD_MEMBER, newPasswordMember),
    takeLatest(UserTypes.UPDATE_MEMBER, updateUserMember),

    //exam user
    takeLatest(ExamUserTypes.GET_LIST_EXAM_USER, getListExamUser),
    takeLatest(ExamUserTypes.CHECK_PASS, checkPass),
    takeLatest(ExamUserTypes.CREATE_ANSWER, createAnswer),

    // group
    takeLatest(GroupTypes.UPLOAD_PDF_HISTORY, uploadPDFHistory),
    takeLatest(GroupTypes.UPLOAD_PDF_INTRODUCTION, uploadPDFIntroduction),
    takeLatest(GroupTypes.GET_GROUP, getGroup),
    takeLatest(GroupTypes.UPDATE_GROUP, updateGroup),
    takeLatest(GroupTypes.GET_LEADER, getLeader),
  ]);
}
