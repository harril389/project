import jwt from "jsonwebtoken";
import { AppConstant } from "../const";
import { responseFormat } from "../utils";

export const verifyToken = (req, res, next) => {
  let token = req.headers["access-token"];
  if (!token) {
    res
      .status(AppConstant.STATUS_UNAUTHORIZED)
      .json(responseFormat({ message: "Token is invalid!" }));
  }

  jwt.verify(token, AppConstant.SECRET_KEY, (error, decoded) => {
    if (error) {
      res
        .status(AppConstant.STATUS_UNAUTHORIZED)
        .json(responseFormat({ message: "Server is error!" }));
    } else {
      req.userUid = decoded.userUid;
      req.roleUid = decoded.roleUid;
      next();
    }
  });
};
