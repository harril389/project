const jwt = require("jsonwebtoken");
import { database } from "../config";
import { AppConstant } from "../const";
import { responseFormat } from "../utils";
const User = database.Model.user;
const Member = database.Model.member;

export const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(AppConstant.STATUS_UNAUTHORIZED).send({
      auth: false,
      message: "No token provided.",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(AppConstant.STATUS_UNAUTHORIZED).send({
        auth: false,
        message: "Fail to Authentication. Error -> " + err,
      });
    }
    req.userId = decoded.id;
    next();
  });
};

export const checkRoles = (req, res, next) => {
  User.findOne({
    where: {
      id: req.userId,
    },
  })
    .then((user) => {
      if (
        user.role === "doitruong" ||
        user.role === "chihoitruong" ||
        user.role === "hoitruong"
      ) {
        next();
        return;
      }
      res.status(403).send("Require Role!");
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

export const checkRolesHoitruong = (req, res, next) => {
  User.findOne({
    where: {
      id: req.userId,
    },
  })
    .then((user) => {
      if (user.role === "hoitruong") {
        next();
        return;
      }
      res.status(403).send("Require Role!");
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

