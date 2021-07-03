import { database } from "../config";
import { AppConstant } from "../const";
import { responseFormat } from "../utils";
const bcrypt = require("bcryptjs");
import dotenv from "dotenv";
const path = require("path");
const fs = require("fs");
const User = database.Model.user;
const Profile = database.Model.member;
const Specialized = database.Model.specialized;
const Position = database.Model.position;
const Club = database.Model.club;
const Branch = database.Model.branch;
const School = database.Model.school;
const Role = database.Model.role;
const Learn = database.Model.learn;
const Activity = database.Model.activity;
let currentTime = new Date();
dotenv.config();

export const CreateProfile = async (req, res) => {
  try {
    let year = currentTime.getFullYear();
    if (
      req.body.full_name === null ||
      req.body.birthday === null ||
      req.body.sex === null ||
      req.body.specialized_uid === null ||
      req.body.position_uid === null ||
      req.body.club_uid === null ||
      req.body.status_activity === null
    ) {
      res
        .status(AppConstant.STATUS_FORBIDDEN)
        .json(responseFormat({ message: "Enter not enough information!" }));
    }
    let profiles = await Profile.findOne({
      where: {
        full_name: req.body.full_name,
        birthday: req.body.birthday,
      },
    });

    if (!profiles) {
      let HandleProfile = await Profile.create({
        full_name: req.body.full_name,
        birthday: req.body.birthday,
        sex: req.body.sex,
        specialized_uid: req.body.specialized_uid,
        position_uid: req.body.position_uid,
        club_uid: req.body.club_uid,
        status_activity: req.body.status_activity,
      });

      let infor = await Club.findOne({
        where: {
          uid: req.body.club_uid,
        },
        attributes: ["code_club"],
        include: [
          {
            model: Profile,
            attributes: [
              "uid",
              [
                database.Sequelize.fn(
                  "COUNT",
                  database.Sequelize.col("members.club_uid")
                ),
                "countMember",
              ],
            ],
          },
        ],
      });

      let countMem = JSON.stringify(infor.dataValues.members[0]);
      let numbers = JSON.parse(countMem);
      let number = numbers["countMember"] + 1;
      let value;
      if (number < 10) {
        value = year + "." + infor.code_club.substring(0, 8) + "00" + number;
      } else if (number >= 10 && number < 100) {
        value = year + "." + infor.code_club.substring(0, 8) + "0" + number;
      } else {
        value = year + "." + infor.code_club.substring(0, 8) + number;
      }
      School.create({
        member_uid: HandleProfile.uid,
      });
      Learn.create({
        member_uid: HandleProfile.uid,
      });
      Activity.create({
        member_uid: HandleProfile.uid,
      });
      let role = await Role.findOne({
        where: {
          role: "member",
        },
      });
      let user = await User.create({
        username: value,
        password: bcrypt.hashSync("12345678", 8),
        role_uid: role.uid,
      });
      await Profile.update(
        {
          code_membership: value,
          user_uid: user.uid,
        },
        {
          where: {
            full_name: req.body.full_name,
            birthday: req.body.birthday,
          },
        }
      );
      let data = await Profile.findOne({
        where: {
          uid: HandleProfile.uid,
        },
        include: [
          {
            model: Specialized,
            attributes: ["professional_level"],
          },
          {
            model: Club,
            attributes: ["name_club"],
            include: [
              {
                model: Branch,
                attributes: ["name_branch"],
              },
            ],
          },
          {
            model: Position,
            attributes: ["position"],
          },
        ],
      });
      res
        .status(AppConstant.STATUS_CREATED)
        .json(responseFormat({ data: data }));
    } else {
      res
        .status(AppConstant.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "User is exist!" }));
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

// Profile User
export const EditProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({
      where: {
        user_uid: req.userUid,
      },
    });
    if (!profile)
      res
        .status(AppConstant.STATUS_SERVER_ERROR)
        .json(responseFormat({ error: error, message: "error" }));
    else {
      await Profile.update(
        {
          id_card: req.body.id_card,
          date_of_issue: req.body.date_of_issue,
          issued_by: req.body.issued_by,
          phonee: req.body.phonee,
          email: req.body.email,
          facebook: req.body.facebook,
          native_land: req.body.native_land,
          address: req.body.address,
          blood_group: req.body.blood_group,
          rh: req.body.rh,
          number_blood_donate: req.body.number_blood_donate,
          date_attend: req.body.date_attend,
          time_activity: req.body.time_activity,
          status_activity: req.body.status_activity,
          information_family: req.body.information_family,
          unit: req.body.unit,
          specific_unit: req.body.specific_unit,
          academic_level: req.body.academic_level,
          party_union_member: req.body.party_union_member,
          comment: req.body.comment,
          specialized_uid: req.body.specialized_uid,
          position_uid: req.body.position_uid,
          club_uid: req.body.club_uid,
        },
        {
          where: {
            user_uid: req.userUid,
          },
        }
      );
      await School.update(
        {
          school: req.body.school,
          class: req.body.class,
          majors: req.body.majors,
          gpa: req.body.gpa,
        },
        {
          where: {
            member_uid: profile.uid,
          },
        }
      );
      await Learn.destroy({
        where: {
          member_uid: profile.uid,
        },
      });
      let learns = req.body.learns;
      for (let i = 0; i < learns.length; i++) {
        await Learn.create({
          learn_school_year: learns[i]["learn_school_year"],
          learn_semester: learns[i]["learn_semester"],
          learn_reason: learns[i]["learn_reason"],
          member_uid: profile.uid,
        });
      }
      await Activity.destroy({
        where: {
          member_uid: profile.uid,
        },
      });
      let activitys = req.body.activitys;
      for (let i = 0; i < activitys.length; i++) {
        await Activity.create({
          activity_school_year: learns[i]["activity_school_year"],
          activity_semester: learns[i]["activity_semester"],
          activity_reason: learns[i]["activity_reason"],
          member_uid: profile.uid,
        });
      }
      let data = await Profile.findOne({
        where: {
          uid: profile.uid,
        },
        include: [
          {
            model: Specialized,
          },
          {
            model: School,
          },
          {
            model: Learn,
          },
          {
            model: Activity,
          },
          {
            model: Club,
            include: [
              {
                model: Branch,
              },
            ],
          },
          {
            model: Position,
          },
        ],
      });
      res.status(AppConstant.STATUS_OK).json(responseFormat({ data: data }));
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
export const ViewProfile = async (req, res) => {
  try {
    let data = await Profile.findOne({
      where: {
        user_uid: req.userUid,
      },
      include: [
        {
          model: Specialized,
        },
        {
          model: School,
        },
        {
          model: Learn,
        },
        {
          model: Activity,
        },
        {
          model: Club,
          include: [
            {
              model: Branch,
            },
          ],
        },
        {
          model: Position,
        },
      ],
    });
    res.status(AppConstant.STATUS_OK).json(responseFormat({ data: data }));
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const UploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      res.status(AppConstant.STATUS_OK).json(responseFormat());
    }
    const processedFile = req.file || {};
    let orgName = processedFile.originalname || "";
    orgName = orgName.trim().replace(/ /g, "-");
    const fullPathInServ = processedFile.path;
    const newFullPath = `${fullPathInServ}-${orgName}`;
    fs.renameSync(fullPathInServ, newFullPath);

    let fileString = path.basename(newFullPath);
    let filePath = `${process.env.SERVER_HOST}/avatar/` + fileString;

    Profile.update(
      {
        image: filePath,
      },
      {
        where: {
          user_uid: req.userUid,
        },
      }
    );
    res.status(AppConstant.STATUS_OK).json(responseFormat({ data: filePath }));
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

// User management by Admin
export const AdminEditProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({
      where: {
        uid: req.params.member_uid,
      },
    });
    if (!profile) {
      res
        .status(AppConstant.STATUS_NOT_FOUND)
        .json(responseFormat({ message: "Profile is not exist!" }));
    } else {
      await Profile.update(
        {
          full_name: req.body.full_name,
          birthday: req.body.birthday,
          sex: req.body.sex,
          id_card: req.body.id_card,
          date_of_issue: req.body.date_of_issue,
          issued_by: req.body.issued_by,
          phonee: req.body.phonee,
          email: req.body.email,
          facebook: req.body.facebook,
          native_land: req.body.native_land,
          address: req.body.address,
          blood_group: req.body.blood_group,
          rh: req.body.rh,
          number_blood_donate: req.body.number_blood_donate,
          date_attend: req.body.date_attend,
          time_activity: req.body.time_activity,
          status_activity: req.body.status_activity,
          information_family: req.body.information_family,
          unit: req.body.unit,
          specific_unit: req.body.specific_unit,
          academic_level: req.body.academic_level,
          party_union_member: req.body.party_union_member,
          comment: req.body.comment,
        },
        {
          where: {
            user_uid: req.userUid,
          },
        }
      );
      await School.update(
        {
          school: req.body.school,
          class: req.body.class,
          majors: req.body.majors,
          gpa: req.body.gpa,
        },
        {
          where: {
            member_uid: profile.uid,
          },
        }
      );
      await Learn.destroy({
        where: {
          member_uid: profile.uid,
        },
      });
      let learns = req.body.learns;
      for (let i = 0; i < learns.length; i++) {
        await Learn.create({
          learn_school_year: learns[i]["learn_school_year"],
          learn_semester: learns[i]["learn_semester"],
          learn_reason: learns[i]["learn_reason"],
          member_uid: profile.uid,
        });
      }
      await Activity.destroy({
        where: {
          member_uid: profile.uid,
        },
      });
      let activitys = req.body.activitys;
      for (let i = 0; i < activitys.length; i++) {
        await Activity.create({
          activity_school_year: learns[i]["activity_school_year"],
          activity_semester: learns[i]["activity_semester"],
          activity_reason: learns[i]["activity_reason"],
          member_uid: profile.uid,
        });
      }
      let data = await Profile.findOne({
        where: {
          uid: profile.uid,
        },
        include: [
          {
            model: Specialized,
          },
          {
            model: School,
          },
          {
            model: Learn,
          },
          {
            model: Activity,
          },
          {
            model: Club,
            include: [
              {
                model: Branch,
              },
            ],
          },
          {
            model: Position,
          },
        ],
      });
      res.status(AppConstant.STATUS_OK).json(responseFormat({ data: data }));
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
export const AdminViewProfile = async (req, res) => {
  try {
    let data = await Profile.findOne({
      where: {
        uid: req.params.member_uid,
      },
      include: [
        {
          model: Specialized,
        },
        {
          model: School,
        },
        {
          model: Learn,
        },
        {
          model: Activity,
        },
        {
          model: Club,
          include: [
            {
              model: Branch,
            },
          ],
        },
        {
          model: Position,
        },
      ],
    });
    res.status(AppConstant.STATUS_OK).json(responseFormat({ data: data }));
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const AdminUploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      res.status(AppConstant.STATUS_OK).json(responseFormat());
    }
    const processedFile = req.file || {};
    let orgName = processedFile.originalname || "";
    orgName = orgName.trim().replace(/ /g, "-");
    const fullPathInServ = processedFile.path;
    const newFullPath = `${fullPathInServ}-${orgName}`;
    fs.renameSync(fullPathInServ, newFullPath);

    let fileString = path.basename(newFullPath);
    let filePath = `${process.env.SERVER_HOST}/avatar/` + fileString;

    Profile.update(
      {
        image: filePath,
      },
      {
        where: {
          uid: req.params.member_uid,
        },
      }
    );
    res.status(AppConstant.STATUS_OK).json(responseFormat({ data: filePath }));
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
