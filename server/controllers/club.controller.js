import { database } from "../config";
import { AppConstant } from "../const";
import { responseFormat } from "../utils";
const Club = database.Model.club;
const Branch = database.Model.branch;
const Position = database.Model.position;
const Member = database.Model.member;
const User = database.Model.user;
const Role = database.Model.role;
const Op = database.Sequelize.Op;

export const CreateClub = async (req, res) => {
  try {
    const club = {};
    let clubs = await Club.findOne({
      where: {
        code_club: req.body.code_club,
      },
    });
    if (!clubs) {
      const club = await Club.create({
        code_club: req.body.code_club,
        name_club: req.body.name_club,
        founded_day: req.body.founded_day,
        address: req.body.address,
        management_unit: req.body.management_unit,
        manager: req.body.manager,
        traditional_day: req.body.traditional_day,
        place_under: req.body.place_under,
        sympathizer: req.body.sympathizer,
        volunteer: req.body.volunteer,
        member: req.body.member,
        instructor: req.body.instructor,
        coach: req.body.coach,
        staff_strengthened: req.body.staff_strengthened,
        place_blood_donate: req.body.place_blood_donate,
        result_activity: req.body.result_activity,
        branch_uid: req.body.branch_uid,
      });
      res
        .status(AppConstant.STATUS_CREATED)
        .json(responseFormat({ data: club }));
    } else {
      res
        .status(AppConstant.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "Club is exist!" }));
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const EditClub = async (req, res) => {
  try {
    let club = await Club.findOne({
      where: {
        uid: req.params.club_uid,
      },
    });
    if (!club)
      res
        .status(AppConstant.STATUS_NOT_FOUND)
        .json(responseFormat({ message: "Club is not exist!" }));
    else {
      await Club.update(
        {
          code_club: req.body.code_club,
          name_club: req.body.name_club,
          founded_day: req.body.founded_day,
          address: req.body.address,
          management_unit: req.body.management_unit,
          manager: req.body.manager,
          traditional_day: req.body.traditional_day,
          place_under: req.body.place_under,
          sympathizer: req.body.sympathizer,
          volunteer: req.body.volunteer,
          member: req.body.member,
          instructor: req.body.instructor,
          coach: req.body.coach,
          staff_strengthened: req.body.staff_strengthened,
          place_blood_donate: req.body.place_blood_donate,
          result_activity: req.body.result_activity,
          branch_uid: req.body.branch_uid,
        },
        {
          where: {
            uid: req.params.club_uid,
          },
        }
      );
      let data = await Club.findOne({
        where: {
          uid: req.params.club_uid,
        },
        include: [
          {
            model: Branch,
            attributes: ["uid", "code_branch"],
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

export const DeleteClub = async (req, res) => {
  try {
    let club = await Club.destroy({
      where: {
        uid: req.params.club_uid,
      },
    });
    if (club !== 0) {
      res.status(AppConstant.STATUS_OK).json(responseFormat());
    } else {
      res
        .status(AppConstant.STATUS_FORBIDDEN)
        .json(responseFormat({ message: "An error occurred!" }));
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const ViewClubByUid = async (req, res) => {
  try {
    let club = await Club.findOne({
      where: {
        uid: req.params.club_uid,
      },
    });
    res.status(AppConstant.STATUS_OK).json(responseFormat({ data: club }));
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const ViewClub = async (req, res) => {
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
    let queryData = {};
    if (req.query?.name_filter) {
      queryData.name_club = {
        [Op.like]: `%${req.query?.name_filter}%`,
      };
    }
    if (req.query?.code_branch_filter) {
      let branch = await Branch.findOne({
        where: {
          code_branch: req.query.code_branch_filter,
        },
        attributes: ["uid"],
      });
      queryData.branch_uid = branch.uid;
    }
    let clubs = await Club.findAndCountAll({
      ...pagination,
      where: {
        ...queryData,
      },
      include: [
        {
          model: Branch,
          attributes: ["uid", "code_branch"],
        },
      ],
    });
    res.status(AppConstant.STATUS_OK).json({
      success: true,
      message: "OK",
      total: clubs.count,
      data: clubs.rows,
    });
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
export const GetAllClub = async (req, res) => {
  try {
    let clubs = await Club.findAll({
      attributes: ["uid", "name_club", "code_club"],
    });
    res.status(AppConstant.STATUS_OK).json(responseFormat({ data: clubs }));
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
