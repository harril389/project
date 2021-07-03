import{
  LeaderAssociation,
  ViewMemberInformation
} from "./admin.controller"
import {
  ViewAssociation,
  EditAssociation,
  ViewPDF,
  EditPDF,
  EditPDFHistory,
  ViewLinkTest,
  EditLinkTest,
} from "./association.controller";
import{
  EditPassword,
  ForgetPassword,
  NewPassword,
} from "./user.controller"
import{
  CreateProfile,
  EditProfile,
  ViewProfile,
  UploadAvatar,
  AdminEditProfile,
  AdminViewProfile,
  AdminUploadAvatar,
} from "./member.controller"
import{
  CreateBranch,
  EditBranch,
  DeleteBranch,
  ViewBranchByUid,
  ViewBranch
} from "./branch.controller"
import{
  CreateClub,
  EditClub,
  DeleteClub,
  ViewClub,
  ViewClubByUid,
  GetAllClub,
} from "./club.controller"
import{
  ViewPosition,
  CreatePosition,
  EditPosition,
  DeletePosition,
} from "./position.controller";
import {
  CreateBackground,
  ViewBackground,
  ViewBackgroundByUid,
  SlideShowBackground,
  EditBackground,
  DeleteBackground,
} from "./background.controller";
import {
  ViewSpecialized,
  CreateSpecialized,
  EditSpecialized,
  DeleteSpecialized,
} from "./specialized.controller";
import {
  CreateRole,
  EditRole,
  ViewRole,
  ViewRoleByUid,
  DeleteRole,
  RoleDetail,
} from "./role.controller";
import {
  CreateTypeQuestion,
  EditTypeQuestion,
  ViewTypeQuestion,
  ViewTypeQuestionByUid,
  DeleteTypeQuestion,
} from "./type_question.controller";
import {
  CreateQuestion,
  EditQuestion,
  ViewQuestion,
  ViewQuestionByUid,
  DeleteQuestion,
} from "./question.controller";
import * as ExamAdmin from "./exam-admin.controller";
import {
  CreateFunction,
  EditFunction,
  ViewFunction,
  DeleteFunction,
} from "./function.controller";
import * as ExamUser from "./exam-user.controller";
import { Login } from "./common.controller";

export {
  // function for admin
  LeaderAssociation,
  ViewMemberInformation,
  // function for association
  ViewAssociation,
  EditAssociation,
  ViewPDF,
  EditPDF,
  EditPDFHistory,
  ViewLinkTest,
  EditLinkTest,
  // function for user
  Login,
  EditPassword,
  ForgetPassword,
  NewPassword,
  // CheckToken,
  // function for member
  CreateProfile,
  EditProfile,
  ViewProfile,
  UploadAvatar,
  AdminEditProfile,
  AdminViewProfile,
  AdminUploadAvatar,
  // function for brach
  CreateBranch,
  EditBranch,
  DeleteBranch,
  ViewBranchByUid,
  ViewBranch,
  // function for club
  CreateClub,
  EditClub,
  DeleteClub,
  ViewClub,
  ViewClubByUid,
  GetAllClub,
  // function for position
  ViewPosition,
  CreatePosition,
  EditPosition,
  DeletePosition,
  // function for background
  CreateBackground,
  ViewBackground,
  ViewBackgroundByUid,
  SlideShowBackground,
  EditBackground,
  DeleteBackground,
  // function for specialized
  ViewSpecialized,
  CreateSpecialized,
  EditSpecialized,
  DeleteSpecialized,
  // function for role
  CreateRole,
  EditRole,
  ViewRole,
  ViewRoleByUid,
  DeleteRole,
  RoleDetail,
  //function
  CreateFunction,
  EditFunction,
  ViewFunction,
  DeleteFunction,
  //function for type question
  CreateTypeQuestion,
  EditTypeQuestion,
  ViewTypeQuestion,
  ViewTypeQuestionByUid,
  DeleteTypeQuestion,
  //function for question
  CreateQuestion,
  EditQuestion,
  ViewQuestion,
  ViewQuestionByUid,
  DeleteQuestion,
  // Exam
  ExamAdmin,
  ExamUser,
};
