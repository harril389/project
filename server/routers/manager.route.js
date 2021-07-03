import express from "express";
const multer = require("multer");
import { PathConstant } from "../const";
import { verifyToken } from "../middleware";
const path = require("path");
import {
  CreateBranch,
  EditBranch,
  ViewBranchByUid,
  DeleteBranch,
  CreateClub,
  EditClub,
  ViewClubByUid,
  ViewClub,
  DeleteClub,
  CreatePosition,
  EditPosition,
  DeletePosition,
  CreateSpecialized,
  EditSpecialized,
  ViewSpecialized,
  DeleteSpecialized,
  ViewAssociation,
  EditAssociation,
  ViewPDF,
  EditPDF,
  EditPDFHistory,
  ViewLinkTest,
  EditLinkTest,
  CreateProfile,
  ViewPosition,
  ViewBranch,
  EditProfile,
  ViewProfile,
  UploadAvatar,
  AdminEditProfile,
  AdminViewProfile,
  AdminUploadAvatar,
  LeaderAssociation,
  ViewMemberInformation,
  GetAllClub,
} from "../controllers";
const managerRouter = express.Router();
const imageUploader = multer({ dest: "images/" });
const pdfUploader = multer({ dest: "pdfs/" });
//API member
managerRouter.post(PathConstant.MEMBER, verifyToken, CreateProfile); //done
managerRouter.put(PathConstant.MEMBER, verifyToken, EditProfile); //done
managerRouter.get(PathConstant.MEMBER, verifyToken, ViewProfile); //done
managerRouter.put(PathConstant.ADMIN_MEMBER_UID, verifyToken, AdminEditProfile);
managerRouter.get(PathConstant.ADMIN_MEMBER_UID, verifyToken, AdminViewProfile);
managerRouter.post(
  "/admin/upload/avatar/:member_uid",
  [imageUploader.single("avatar")],
  verifyToken,
  AdminUploadAvatar
);
managerRouter.post(
  "/admin/upload/avatar",
  [imageUploader.single("avatar")],
  verifyToken,
  UploadAvatar
);
managerRouter.get("/avatar/:name", (req, res) => {
  const fileName = req.params.name;
  if (!fileName) {
    return res.send({
      status: false,
      message: "no filename specified",
    });
  }
  res.sendFile(path.resolve(`./images/${fileName}`));
});
//API branch
managerRouter.post(PathConstant.BRANCH, verifyToken, CreateBranch); //done
managerRouter.put(PathConstant.BRANCH_UID, verifyToken, EditBranch); //done
managerRouter.get(PathConstant.BRANCH_UID, verifyToken, ViewBranchByUid); //done
managerRouter.delete(PathConstant.BRANCH_UID, verifyToken, DeleteBranch); //done
managerRouter.get(PathConstant.BRANCH, verifyToken, ViewBranch); //done

//API club
managerRouter.post(PathConstant.CLUB, verifyToken, CreateClub); //done
managerRouter.put(PathConstant.CLUB_UID, verifyToken, EditClub); //done
managerRouter.get(PathConstant.CLUB_UID, verifyToken, ViewClubByUid); //done
managerRouter.get(PathConstant.CLUB, verifyToken, ViewClub); // done
managerRouter.delete(PathConstant.CLUB_UID, verifyToken, DeleteClub); //done
managerRouter.get("/allclub", GetAllClub);

//API position
managerRouter.get(PathConstant.POSITION, verifyToken, ViewPosition);
managerRouter.post(PathConstant.POSITION, verifyToken, CreatePosition); //done
managerRouter.put(PathConstant.POSITION_UID, verifyToken, EditPosition); //done
managerRouter.delete(PathConstant.POSITION_UID, verifyToken, DeletePosition); //done

//API specialized
managerRouter.post(PathConstant.SPECIALIZED, verifyToken, CreateSpecialized); //done
managerRouter.put(PathConstant.SPECIALIZED_UID, verifyToken, EditSpecialized); //done
managerRouter.get(PathConstant.SPECIALIZED, verifyToken, ViewSpecialized); //done
managerRouter.delete(
  PathConstant.SPECIALIZED_UID,
  verifyToken,
  DeleteSpecialized
); //done

//API Association
managerRouter.get(PathConstant.ASSOCIATION, verifyToken, ViewAssociation); //done
managerRouter.post(PathConstant.ASSOCIATION, verifyToken, EditAssociation); //done
managerRouter.get(PathConstant.PDF, verifyToken, ViewPDF); //done
managerRouter.post(PathConstant.PDF, [pdfUploader.single("pdf")], EditPDF); //done
managerRouter.post(
  PathConstant.PDF_HISTORY,
  [pdfUploader.single("pdf")],
  EditPDFHistory
); //done
managerRouter.get("/pdf/:name", (req, res) => {
  const fileName = req.params.name;
  if (!fileName) {
    return res.send({
      status: false,
      message: "no filename specified",
    });
  }
  res.sendFile(path.resolve(`./pdfs/${fileName}`));
});
managerRouter.get(PathConstant.LINK_TEST, verifyToken, ViewLinkTest); //done
managerRouter.post(PathConstant.LINK_TEST, verifyToken, EditLinkTest); //done

//API Admin
managerRouter.get(PathConstant.LEADER, verifyToken, LeaderAssociation);
managerRouter.get(PathConstant.ADMIN, verifyToken, ViewMemberInformation);

export default managerRouter;
