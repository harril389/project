//volunteer management
export const LOGIN = "/login";
export const PASSWORD = "/password";
export const PASSWORD_FORGET = "/forget_password";
export const PASSWORD_NEW = "/new_password";
export const CHECK_TOKEN = "/api/token/check";
// Member
export const MEMBER = "/member";
export const ADMIN_MEMBER_UID = "/admin/member/:member_uid";
// Admin
export const LEADER = "/leader";
export const ADMIN = "/admin/view/member";

// Position
export const POSITION = "/position";
export const POSITION_UID = "/position/:position_uid";

// Specialized
export const SPECIALIZED = "/specialized";
export const SPECIALIZED_UID = "/specialized/:specialized_uid";

// Association
export const ASSOCIATION = "/association";
export const PDF = "/introduction";
export const PDF_HISTORY = "/history";
export const LINK_TEST = "/link-test";

export const GET_LEADER_ALL = "/api/association/leader/all";

// Background
export const BACKGROUND = "/background";
export const BACKGROUND_ID = "/background/:background_id";

// Profile
export const PROFILE = "/information";
export const PROFILE_UID = "/information/:information_uid";
export const GET_AVATAR = "/api/avatar/";
export const UPLOAD_AVATAR = "/api/upload/avatar";
export const ACTIVITY = "/learnactivity";
// export const ACTIVITY = "/learnactivity/";

// Unit
export const BRANCH = "/branch";
export const BRANCH_UID = "/branch/:branch_uid";
export const CLUB = "/club";
export const CLUB_UID = "/club/:club_uid";

// test exam
export const ROOT = "/";
export const USER = "/user";
export const ROLE = "/role";
export const ROLE_UID = "/role/:role_uid";
export const FUNCTION = "/function";
export const FUNCTION_UID = "/function/:function_uid";
export const TYPE_QUESTION = "/type-question";
export const TYPE_QUESTION_UID = "/type-question/:type_question_uid";
export const QUESTION = "/question";
export const QUESTION_UID = "/question/:question_uid";
export const EXAM = "/exam";
export const EXAM_UID = "/exam/:exam_uid";

// Api Exam User
export const EXAM_LIST = "/exam-list";
export const CHECK_PASSWORD_EXAM = "/exam/check-password";
export const ANSWER_USER = "/exam-answer/:exam_uid";
export const HISTORY_EXAM = "/exam-history";
export const HISTORY_EXAM_UID = "/exam-history/:exam_uid";
