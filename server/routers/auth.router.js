import express from "express";
import { verifyToken } from "../middleware";
import { checkPassword } from "./verifySignUp"
import { AppConstant, PathConstant } from "../const";
import {
  CreateQuestion,
  CreateTypeQuestion,
  DeleteTypeQuestion,
  EditQuestion,
  EditTypeQuestion,
  ViewQuestion,
  ViewTypeQuestion,
  ViewTypeQuestionByUid,
  ViewQuestionByUid,
  DeleteQuestion,
  CreateRole,
  CreateFunction,
  EditFunction,
  DeleteFunction,
  DeleteRole,
  ViewRoleByUid,
  EditRole,
  ViewRole,
  ViewFunction,
  Login,
  EditPassword,
  ForgetPassword,
  RoleDetail,
  NewPassword,
} from "../controllers";

const authRouter = express.Router();

authRouter.get(PathConstant.ROOT, (req, res) => {
  res.status(AppConstant.STATUS_OK).json({ notify: "oke" });
});

// Login API
authRouter.post(PathConstant.LOGIN, Login);

//API user
authRouter.put(PathConstant.PASSWORD, verifyToken, checkPassword, EditPassword)
authRouter.post(PathConstant.PASSWORD_FORGET, ForgetPassword)
authRouter.post(PathConstant.PASSWORD_NEW, verifyToken, checkPassword, NewPassword)

//API role
authRouter.post(PathConstant.ROLE, verifyToken , CreateRole);
authRouter.put(PathConstant.ROLE_UID, verifyToken , EditRole);
authRouter.get(PathConstant.ROLE, verifyToken , ViewRole);
authRouter.get(PathConstant.ROLE_UID, verifyToken , ViewRoleByUid);
authRouter.delete(PathConstant.ROLE_UID, verifyToken , DeleteRole);
authRouter.get("/role_detail", verifyToken, RoleDetail)

//API function
authRouter.post(PathConstant.FUNCTION, verifyToken , CreateFunction);
authRouter.put(PathConstant.FUNCTION_UID, verifyToken , EditFunction);
authRouter.get(PathConstant.FUNCTION, verifyToken , ViewFunction);
authRouter.delete(PathConstant.FUNCTION_UID, verifyToken , DeleteFunction);

// API type question
authRouter.post(PathConstant.TYPE_QUESTION, verifyToken , CreateTypeQuestion);
authRouter.put(PathConstant.TYPE_QUESTION_UID, verifyToken , EditTypeQuestion);
authRouter.get(PathConstant.TYPE_QUESTION, verifyToken , ViewTypeQuestion);
authRouter.get(PathConstant.TYPE_QUESTION_UID, verifyToken , ViewTypeQuestionByUid);
authRouter.delete(PathConstant.TYPE_QUESTION_UID, verifyToken , DeleteTypeQuestion);

// API question
authRouter.post(PathConstant.QUESTION, verifyToken , CreateQuestion);
authRouter.put(PathConstant.QUESTION_UID, verifyToken , EditQuestion);
authRouter.get(PathConstant.QUESTION, verifyToken , ViewQuestion);
authRouter.get(PathConstant.QUESTION_UID, verifyToken , ViewQuestionByUid);
authRouter.delete(PathConstant.QUESTION_UID, verifyToken , DeleteQuestion);

export default authRouter;
