import { database } from "../config";
import { AppConstant } from "../const";
import { responseFormat } from "../utils";
const Branch = database.Model.branch;
const Club = database.Model.club;
const Member = database.Model.member;
const User = database.Model.user;
const Position = database.Model.position;
const Specialized = database.Model.specialized;
const Role = database.Model.role;
const Op = database.Sequelize.Op;

export const ViewMemberInformation = async (req, res) => {
  try {
    let size = parseInt(req.query.size || 10);
    let page = parseInt(req.query.page || 1);
    let paging = parseInt(req.query.paging || 0);

    let pagination =
      paging === 0
        ? {}
        : {
            limit: size,
            offset: (page - 1) * size,
          };
    let queryMember = {};
    if (req.query.full_name) {
      queryMember["full_name"] = { [Op.like]: `%` + req.query.full_name + `%` };
    }
    if (req.query.blood_group) {
      queryMember["blood_group"] = req.query.blood_group;
    }
    if (req.query.address) {
      queryMember["address"] = { [Op.like]: `%` + req.query.address + `%` };
    }
    if (req.query.birthday) {
      queryMember["Op.and"] = database.Sequelize.where(
        database.Sequelize.fn("YEAR", database.Sequelize.col("birthday")),
        req.query.birthday
      );
    }
    if (req.query.club_uid) {
      queryMember["club_uid"] = req.query.club_uid;
    }
    let user = await User.findOne({
      where: {
        uid: req.userUid,
      },
      include:{
        model: Role,
        attributes:["role"]
      }
    });

    let member = await Member.findOne({
      where: {
        user_uid: req.userUid,
      },
      attributes: ["club_uid"],
      include: {
        model: Club,
        attributes: ["branch_uid"],
      },
    });
    console.log(user.role.role)
    // Kiểm tra quyền hội trưởng
    if (user.role.role === "hoitruong") {
      if (
        !req.query.full_name &&
        !req.query.blood_group &&
        !req.query.address &&
        !req.query.birthday &&
        !req.query.club_uid &&
        !req.query.branch_uid
      ) {
        let information = await Member.findAndCountAll({
          ...pagination,
          include: [
            {
              model: Position,
            },
            {
              model: Specialized,
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
          ],
        });
        res.status(AppConstant.STATUS_OK).json({
          success: true,
          message: "OK",
          total: information.count,
          data: information.rows,
        });
      } else if (
        !req.query.full_name &&
        !req.query.blood_group &&
        !req.query.address &&
        !req.query.birthday &&
        !req.query.club_uid &&
        req.query.branch_uid
      ) {
        let information = await Member.findAndCountAll({
          ...pagination,
          include: [
            {
              model: Position,
            },
            {
              model: Specialized,
            },
            {
              model: Club,
              where: {
                branch_uid: req.query.branch_uid,
              },
              attributes: ["name_club"],
              include: [
                {
                  model: Branch,
                  attributes: ["name_branch"],
                },
              ],
            },
          ],
        });
        res.status(AppConstant.STATUS_OK).json({
          success: true,
          message: "OK",
          total: information.count,
          data: information.rows,
        });
      } else if (!req.query.branch_uid) {
        let information = await Member.findAndCountAll({
          ...pagination,
          where: queryMember,
          include: [
            {
              model: Position,
            },
            {
              model: Specialized,
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
          ],
        });
        res.status(AppConstant.STATUS_OK).json({
          success: true,
          message: "OK",
          total: information.count,
          data: information.rows,
        });
      } else {
        let information = await Member.findAndCountAll({
          ...pagination,
          where: queryMember,
          include: [
            {
              model: Position,
            },
            {
              model: Specialized,
            },
            {
              model: Club,
              where: {
                branch_uid: req.query.branch_uid,
              },
              attributes: ["name_club"],
              include: [
                {
                  model: Branch,
                  attributes: ["name_branch"],
                  
                },
              ],
            },
          ],
        });
        res.status(AppConstant.STATUS_OK).json({
          success: true,
          message: "OK",
          total: information.count,
          data: information.rows,
        });
      }

    // Kiểm tra quyền chi hội trưởng
    } else if (user.role.role === "chihoitruong") {
      if (
        ( !req.query.full_name &&
          !req.query.blood_group &&
          !req.query.address &&
          !req.query.birthday &&
          !req.query.club_uid &&
          !req.query.branch_uid ) ||
        (!req.query.full_name &&
          !req.query.blood_group &&
          !req.query.address &&
          !req.query.birthday &&
          !req.query.club_uid &&
          req.query.branch_uid)
      ) {
        let information = await Member.findAndCountAll({
          ...pagination,
          include: [
            {
              model: Position,
              where: {
                rank: {
                  [Op.gte]: 3,
                },
              },
            },
            {
              model: Specialized,
            },
            {
              model: Club,
              where: {
                branch_uid: member.club.branch_uid,
              },
              attributes: ["name_club"],
              include: [
                {
                  model: Branch,
                  attributes: ["name_branch"],
                },
              ],
            },
          ],
        });
        res.status(AppConstant.STATUS_OK).json({
          success: true,
          message: "OK",
          total: information.count,
          data: information.rows,
        });
      } else {
        let information = await Member.findAndCountAll({
          ...pagination,
          where: queryMember,
          include: [
            {
              model: Position,
              where: {
                rank: {
                  [Op.gte]: 3,
                },
              },
            },
            {
              model: Specialized,
            },
            {
              model: Club,
              where: {
                branch_uid: member.club.branch_uid,
              },
              attributes: ["name_club"],
              include: [
                {
                  model: Branch,
                  attributes: ["name_branch"],
                },
              ],
            },
          ],
        });
        res.status(AppConstant.STATUS_OK).json({
          success: true,
          message: "OK",
          total: information.count,
          data: information.rows,
        });
      }

      // Kiểm tra quyền đội trưởng
    } else {
      if (
        ( !req.query.full_name &&
          !req.query.blood_group &&
          !req.query.address &&
          !req.query.birthday &&
          !req.query.club_uid &&
          !req.query.branch_uid ) ||
        (!req.query.full_name &&
          !req.query.blood_group &&
          !req.query.address &&
          !req.query.birthday &&
          !req.query.club_uid &&
          req.query.branch_uid)
      ) {
        let information = await Member.findAndCountAll({
          ...pagination,
          include: [
            {
              model: Position,
              where: {
                position: {
                  [Op.gte]: 2,
                },
              },
            },
            {
              model: Specialized,
            },
            {
              model: Club,
              where: {
                uid: member.club_uid,
              },
              attributes: ["name_club"],
              include: [
                {
                  model: Branch,
                  attributes: ["name_branch"],
                },
              ],
            },
          ],
        });
        res.status(AppConstant.STATUS_OK).json({
          success: true,
          message: "OK",
          total: information.count,
          data: information.rows,
        });
      } else {
        let information = await Member.findAndCountAll({
          ...pagination,
          where: queryMember,
          include: [
            {
              model: Position,
              where: {
                position: {
                  [Op.gte]: 2,
                },
              },
            },
            {
              model: Specialized,
            },
            {
              model: Club,
              where: {
                uid: member.club_uid,
                branch_uid: req.query.branch_uid,
              },
              attributes: ["name_club"],
              include: [
                {
                  model: Branch,
                  attributes: ["name_branch"],
                },
              ],
            },
          ],
        });
        res.status(AppConstant.STATUS_OK).json({
          success: true,
          message: "OK",
          total: information.count,
          data: information.rows,
        });
      }
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const LeaderAssociation = async (req, res) => {
  try {
    let members = await Member.findAll({
      attributes: [
        "image",
        "full_name",
        "time_activity",
        "status_activity",
        "comment",
      ],
      include: [
        {
          model: Position,
          where: {
            position: "Chủ tịch",
          },
          attributes: ["position"],
        },
      ],
    });
    res.status(AppConstant.STATUS_OK).json(
      responseFormat({
        data: members,
      })
    );
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

