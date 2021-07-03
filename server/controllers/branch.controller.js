import { database } from "../config";
import { AppConstant } from "../const";
import { responseFormat } from "../utils";
const Branch = database.Model.branch;
const Position = database.Model.position;
const Club = database.Model.club;
const Member = database.Model.member;

export const CreateBranch = async (req, res) => {
  try {
    let branchs = await Branch.findOne({
      where: {
        code_branch: req.body.code_branch,
      },
    });
    if (!branchs) {
      const  branch = await Branch.create({
        code_branch: req.body.code_branch,
        name_branch: req.body.name_branch,
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
      })
       res
        .status(AppConstant.STATUS_CREATED)
        .json(responseFormat({ data: branch }));
    } else {
      res
        .status(AppConstant.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "Branch is exist!" }));
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const EditBranch = async (req, res) => {
  try {
    let Branchs = await Branch.findOne({
      where: {
        uid: req.params.branch_uid,
      },
    });
    if (!Branchs) {
      res
        .status(AppConstant.STATUS_NOT_FOUND)
        .json(responseFormat({ message: "Branch is not exist!" }));
    } else {
      await Branch.update(
        {
          code_branch: req.body.code_branch,
          name_branch: req.body.name_branch,
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
        },
        {
          where: {
            uid: req.params.branch_uid,
          },
        }
      );
      let data = await Branch.findOne({
        where: {
          uid: req.params.branch_uid,
        },
      });
      res.status(AppConstant.STATUS_OK).json(responseFormat({ data: data }));
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const DeleteBranch = async (req, res) => {
  try {
    let branch = await Branch.destroy({
      where: {
        uid: req.params.branch_uid,
      },
    });
    if (branch !== 0) {
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
export const ViewBranchByUid = async (req, res) => {
  try {
    let branch = await Branch.findOne({
      where: {
        uid: req.params.branch_uid,
      },
    });
    res.status(AppConstant.STATUS_OK).json(responseFormat({ data: branch }));
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const ViewBranch = async (req, res) => {
  try {
    let branch = await Branch.findAll({
      where: {
      },
      include:[
        {
          model: Club,
         
        }
      ]
    });
    res.status(AppConstant.STATUS_OK).json(responseFormat({ data: branch }));
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
