import { database } from "../config";
import { AppConstant } from "../const";
import { responseFormat } from "../utils";
const Position = database.Model.position;
const User = database.Model.user;
const Role = database.Model.role;
const Op = database.Sequelize.Op;

export const ViewPosition = async (req, res) => {
  try {
    let user = await User.findOne({
      where: {
        uid: req.userUid,
      },
    });
    let roles = await Role.findOne({
      where: {
        uid: user.role_uid,
      },
    });
    if (roles.role === "hoitruong") {
      let position = await Position.findAll({
        attributes: ["uid", "position"],
      });
      res
        .status(AppConstant.STATUS_OK)
        .json(responseFormat({ data: position }));
    } else if (roles.role === "chihoitruong") {
      let position = await Position.findAll({
        where: {
          rank: {
            [Op.ne]: 1,
          },
        },
        attributes: ["uid", "position"],
      });
      res
        .status(AppConstant.STATUS_OK)
        .json(responseFormat({ data: position }));
    } else {
      let position = await Position.findAll({
        where: {
          rank: {
            [Op.eq]: 3,
          },
        },
        attributes: ["uid", "position"],
      });
      res
        .status(AppConstant.STATUS_OK)
        .json(responseFormat({ data: position }));
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const CreatePosition = async (req, res) => {
  try {
    let position = await Position.findOne({
      where: {
        position: req.body.position,
        rank: req.body.rank,
      },
    });
    if (!position) {
      const position = await Position.create({
        position: req.body.position,
        rank: req.body.rank,
      });
      res
        .status(AppConstant.STATUS_CREATED)
        .json(responseFormat({ data: position }));
    } else {
      res
        .status(AppConstant.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "Position is exist!" }));
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const EditPosition = async (req, res) => {
  try {
    const position = await Position.update(
      {
        position: req.body.position,
        rank: req.body.rank,
      },
      {
        where: {
          uid: req.params.position_uid,
        },
      }
    );
    const data = await Position.findOne({
      where: {
        uid: req.params.position_uid,
      },
    });
    res.status(AppConstant.STATUS_OK).json(responseFormat({ data: data }));
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const DeletePosition = async (req, res) => {
  try {
    await Position.destroy({
      where: {
        uid: req.params.position_uid,
      },
    });
    res.status(AppConstant.STATUS_OK).json(responseFormat());
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
