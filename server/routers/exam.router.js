import express from "express";
import { PathConstant } from "../const";
import { ExamAdmin, ExamUser } from "../controllers";
import { verifyToken } from "../middleware";

const examRouter = express.Router();

// API Admin Exam
examRouter.post(PathConstant.EXAM, verifyToken, ExamAdmin.CreateExam);
examRouter.put(PathConstant.EXAM_UID, verifyToken, ExamAdmin.EditExam);
examRouter.get(PathConstant.EXAM, verifyToken, ExamAdmin.ViewExam);
examRouter.get(PathConstant.EXAM_UID, verifyToken, ExamAdmin.ViewExamByUid);
examRouter.delete(PathConstant.EXAM_UID, verifyToken, ExamAdmin.DeleteExam);

// API User Exam
examRouter.get(
  PathConstant.EXAM_LIST,
  verifyToken,
  verifyToken,
  ExamUser.ExamList
);
examRouter.post(
  PathConstant.CHECK_PASSWORD_EXAM,
  verifyToken,
  ExamUser.CheckPassword
);
examRouter.put(PathConstant.ANSWER_USER, verifyToken, ExamUser.AnswerUser);
examRouter.get(
  PathConstant.HISTORY_EXAM,
  verifyToken,
  ExamUser.getListHistoryTakingExam
);
examRouter.get(
  PathConstant.HISTORY_EXAM_UID,
  verifyToken,
  ExamUser.getHistoryExamByUid
);

export default examRouter;
