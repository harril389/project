import { database } from "../config";
import { AppConstant } from "../const";
import { responseFormat } from "../utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const User = database.Model.user;
const Role = database.Model.role;

export const Login = async (req, res) => {
  try {
    let user = await User.findOne({
      where: {
        username: req.body.username,
      },
      include: [
        {
          model: Role,
        },
      ],
    });

    if (!user) {
      res
        .status(AppConstant.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "User is not exists!" }));
    } else {
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        res
          .status(AppConstant.STATUS_BAD_REQUEST)
          .json(responseFormat({ message: "Password is invalid!" }));
      } else {
        let token = jwt.sign(
          { userUid: user.uid, roleUid: user.role_uid },
          AppConstant.SECRET_KEY,
          {
            expiresIn: 86400, // Expires in 24 hours
          }
        );
        res.status(AppConstant.STATUS_OK).json(
          responseFormat({
            data: {
              uid: user.uid,
              username: user.username,
              token: token,
              role: user.role.role,
            },
          })
        );
      }
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
