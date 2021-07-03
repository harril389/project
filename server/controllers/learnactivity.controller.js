import { database } from "../config";
import { AppConstant } from "../const";
import { responseFormat } from "../utils";
const Member = database.Model.member;
const School = database.Model.school;
const Learn = database.Model.learn;
const Activity = database.Model.activity;
const Club = database.Model.club;
const Position = database.Model.position;
const Specialized = database.Model.specialized;
const Branch = database.Model.branch;

export const ViewLearnActivity = async (req, res) => {
  try {
    let member = await Member.findOne({
      where: {
        user_uid: req.user_uid,
      },
    });
    let information = await School.findAll({
      where: {
        member_uid: member.uid,
      },
      include: [
        {
          model: Learn,
        },
        {
          model: Activity,
        },
      ],
    });
    res.status(AppConstant.STATUS_OK).json(responseFormat({ data: information }));
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const ViewActivity = async (req, res) => {
  try {
    let information = await Member.findOne({
      where: {
        user_uid: req.user_uid,
      },
      attributes: ["date_attend", "time_activity"],
      include: [
        {
          model: Position,
          attributes: ["position"],
        },
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
      ],
    });
    res.status(AppConstant.STATUS_OK).json(responseFormat({ data: information }));
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const ViewActivityAdmin = async (req, res) => {
  try {
    let information = await Member.findOne({
      where: {
        user_uid: req.query.user_uid,
      },
      attributes: ["date_attend", "time_activity"],
      include: [
        {
          model: Position,
          attributes: ["position"],
        },
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
      ],
    });
    res.status(AppConstant.STATUS_OK).json(responseFormat({ data: information }));
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const EditLearnActivity = async (req, res) => {
  try {
    let member = await Member.findOne({
      where: {
        user_uid: req.user_uid,
      },
    });
    let school = await School.findOne({
      where: {
        member_uid: member.uid,
      },
    });
    if (!school) {
      const infor = await School.create({
        school: req.body.school,
        class: req.body.class,
        majors: req.body.majors,
        gpa: req.body.gpa,
        member_uid: member.uid,
      });
      res.status(200).send({ success: true, data: "create successful" });
    } else {
      School.update(
        {
          Truong: req.body.truong,
          Lop: req.body.lop,
          Nganh: req.body.nganh,
          GPA: req.body.gpa,
       
    
        },
        {
          where: {
            memberId: member.id,
          },
        }
      );
      res.status(200).send({ success: true, data: "Update successful!" });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: "Error -> " + error });
  }
};

export const ViewLearnActivityAdmin = async (req, res) => {
  try {
    let information = await School.findAll({
      where: {
        member_uid: req.query.uid,
      },
      include: [
        {
          model: Learn,
        },
        {
          model: Activity,
        },
      ],
    });
    res.status(AppConstant.STATUS_OK).json(responseFormat({ data: information }));
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const EditLearnActivityAdmin = async (req, res) => {
  try {
    let school = await School.findOne({
      where: {
        memberId: req.body.id,
      },
    });
    if (!school) {
      School.create({
        Truong: req.body.truong,
        Lop: req.body.lop,
        Nganh: req.body.nganh,
        GPA: req.body.gpa,
        memberId: req.body.id,
      });
      res.status(200).send({ success: true, data: "create successful!" });
    } else {
      School.update(
        {
          Truong: req.body.truong,
          Lop: req.body.lop,
          Nganh: req.body.nganh,
          GPA: req.body.gpa,
        },
        {
          where: {
            memberId: req.body.id,
          },
        }
      );
      res.status(200).send({ success: true, data: "update successful!" });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: "Error -> " + error });
  }
};
