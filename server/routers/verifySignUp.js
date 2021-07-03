import { database } from "../config";
import { AppConstant } from "../const";

export const checkPassword = (req, res, next) => {
  if (req.body.newpassword != req.body.passwordConfirm) {
    res.status(AppConstant.STATUS_BAD_REQUEST).send("passwordConfirm is fail");
    return;
  }
  next();
};

