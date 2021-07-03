import { database, configemail } from "../config";
import { AppConstant } from "../const";
import { responseFormat } from "../utils";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import nodemailer from "nodemailer"
const User =  database.Model.user;
const Member =  database.Model.member;
dotenv.config();

export const EditPassword = async (req, res) => {
  try {
    let user = await User.findOne({
      where: {
        uid: req.userUid,
      },
    });
    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      res
        .status(AppConstant.STATUS_UNAUTHORIZED)
        .json(responseFormat({ message: "Password invalid!" }));
    }
    let updateUser = await User.update(
      {
        password: bcrypt.hashSync(req.body.newpassword, 8),
      },
      {
        where: {
          uid: req.userUid,
        },
      }
    );
    res.status(AppConstant.STATUS_OK).json(responseFormat({ data: updateUser }));
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const ForgetPassword = async (req, res) => {
  try {
    let user = await User.findOne({
      where: {
        username: req.body.username,
      },
      include: {
        model: Member,
        attributes: ["email", "full_name"],
      },
    });

    if (!user) {
      res
        .status(AppConstant.STATUS_UNAUTHORIZED)
        .json(responseFormat({ message: "Username invalid!" }));
    } else {
      let token = jwt.sign({ userUid: user.uid }, AppConstant.SECRET_KEY, {
        expiresIn: 86400, // token hết hạn sau 24 giờ
      });
      console.log(user.member.email.trim())
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: configemail.email,
          pass: configemail.password,
        },
      });
      let mailOptions = {
        from: "hội máu",
        // to:	'hoithanhnienvandonghienmau@gmail.com',
        to: user.member.email.trim(),
        subject: "Cập nhật mật khẩu",
        text: "You recieved message from server",
        html: `<div><div style="border-bottom:1px solid gray; width:600px"><h4 style="color:red">
				Hội máu</h4></div><div style="border-bottom:1px solid gray;
				 width:600px"><p>Xin chào ${user.member.full_name},
				 </p><p>Bạn vui lòng truy cập link sau và làm theo hướng dẫn để tạo mật khẩu mới:
				 </p><button style="border:1px solid black; background-color:#d7d1d1; line-height:30px;width:70px;text-align:center;margin-bottom:20px"><a href='${process.env.CLIENT_HOST}/update_password/${token}' style="text-decoration: none;">Tại đây</a></button></div></div>`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res
            .status(AppConstant.STATUS_UNAUTHORIZED)
            .json(responseFormat());
        } else {
          res
           .status(AppConstant.STATUS_Ok)
           .json(responseFormat());
        }
      });
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const NewPassword = async (req, res) => {
  try {
    let user = await User.findOne({
      where: {
        uid: req.userUid,
      },
    });
    let updateUser = await User.update(
      {
        password: bcrypt.hashSync(req.body.newpassword, 8),
      },
      {
        where: {
          uid: user.uid,
        },
      }
    );
    res.status(AppConstant.STATUS_OK).json(responseFormat({ data: updateUser }));
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const CheckToken = async (req, res) => {
  try {
    let token = req.body.token;
    if (!token) {
      res
        .status(AppConstant.STATUS_UNAUTHORIZED)
        .json(responseFormat({ message: "Not token provide" }));
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res
          .status(AppConstant.STATUS_SERVER_ERROR)
          .json(responseFormat({ error: error, message: "error" }));
      } else {
        user_uid = decoded.id
        res.status(AppConstant.STATUS_OK).json(responseFormat({ data: user_uid }));
      }
    });
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
