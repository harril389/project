export const BASE_URL = "http://localhost:5000";
export const HEADER_DEFAULT = {
  Accept: "application/json",
  "Content-Type": "application/json;charset=UTF-8",
};

export const TIMEOUT = 15000;

export const STT_OK = 200;
export const STT_CREATED = 201;
export const STT_UNAUTHORIZED = 401;
export const STT_FORBIDDEN = 403;
export const STT_INTERNAL_SERVER = 500;

export const LOGIN = "/login";
export const QUESTION = "/question";
export const GET_LIST_QUESTION =
  "/question?paging={0}&size={1}&page={2}&filter={3}&type_question_uid={4}&point_start={5}&point_end={6}";
export const QUESTION_UPDATE_DELETE = "/question/{0}";

export const GET_LIST_TYPE_QUESTION = "/type-question?type_filter={0}&paging={1}&size={2}&page={3}";
export const TYPE_QUESTION = "/type-question";
export const TYPE_QUESTION_UPDATE_DELETE = "/type-question/{0}";

export const EXAM = "/exam";
export const GET_LIST_EXAM = "/exam?paging={0}&page={2}&size={1}&name_exam_filter={3}&status={4}";
export const EXAM_UPDATE_DELETE = "/exam/{0}";

export const CLUB_UPDATE_DELETE = "/club/{0}";
export const CLUB = "/club";

export const BRANCH_UPDATE_DELETE = "/branch/{0}";
export const BRANCH = "/branch";

export const GET_LIST_POSITION = "/position";

export const GET_LIST_SPECIALIZED = "/specialized";

export const GET_ALL_CLUB = "/allclub";

export const GET_LIST_CLUB = "/club?paging={0}&size={1}&page={2}&name_filter={3}&code_branch_filter={4}";

export const CREATE_USER = "/member";

export const GET_LIST_USER =
  "/admin/view/member?paging={0}&size={1}&page={2}&full_name={3}&blood_group={4}&address={5}&birthday={6}&club_uid={7}";

export const GET_MEMBER = "/member";

export const UPDATE_MEMBER = "/admin/member/{0}";

export const GET_LIST_EXAM_USER = "/exam-list?paging={0}&page={1}&size={2}&name_exam_filter={3}";

export const CHECK_PASS = "/exam/check-password";

export const POST_ANSWER = "/exam-answer/{0}";

export const UPLOAD_AVATAR = "/admin/upload/avatar";

export const PDF_HISTORY = "/history";

export const PDF_INTRODUCTION = "/introduction";

export const PASSWORD = "/password";
export const PASSWORD_FORGET = "/forget_password";
export const PASSWORD_NEW = "/new_password";

export const ASSOCIATION = "/association";

export const LEADER = "/leader";
