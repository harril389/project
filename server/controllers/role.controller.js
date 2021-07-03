import { database } from "../config";
import { AppConstant } from "../const";
import { responseFormat } from "../utils";
const User = database.Model.user;
const Role = database.Model.role;
const Function = database.Model.function;
const Role_Function = database.Model.role_function;
const Op = database.Sequelize.Op;

const bcrypt = require("bcrypt");


/**
 * create role
 * @param {*} req
 * @param {*} res
 */
export const CreateRole = async (req, res) => {
  try {
    let roles = await Role.findOne({
      where: {
        role: req.body.role,
      },
    });
    if (!roles) {
      const role = await Role.create({
        role: req.body.role,
      });
      let function_uids = req.body.function_uids;
      for (let i = 0; i < function_uids.length; i++) {
        await Role_Function.create({
          function_uid: function_uids[i],
          role_uid: role.uid,
        });
      }
      let user_uids = req.body.user_uids;
      for (let i = 0; i < user_uids.length; i++) {
        let user = await User.findOne({
          where: {
            uid: user_uids[i],
          },
        });
        if (user) {
          User.update(
            {
              role_uid: role.uid,
            },
            {
              where: {
                uid: user.uid,
              },
            }
          );
        } else {
          res
            .status(AppConstant.STATUS_BAD_REQUEST)
            .json(responseFormat({ message: "User is not exist!" }));
        }
      }
      let data = await Role.findAll({
        where: {
          uid: role.uid,
        },
        include: [
          { model: Role_Function, include: [{ model: Function }] },
          { model: User, attributes: ["uid", "username"] },
        ],
      });
      res.status(AppConstant.STATUS_OK).json(responseFormat({ data: data }));
    } else {
      res
        .status(AppConstant.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "Role is not exist!" }));
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
/**
 * edit role
 * @param {*} req
 * @param {*} res
 */
export const EditRole = async (req, res) => {
  try {
    let roles = await Role.findOne({
      where: {
        uid: req.params.role_uid,
      },
    });
    if (!roles) {
      res
        .status(AppConstant.STATUS_NOT_FOUND)
        .json(responseFormat({ message: "Role is not exist!" }));
    } else {
      Role.update(
        {
          role: req.body.role,
        },
        {
          where: {
            uid: req.params.role_uid,
          },
        }
      );
      await Role_Function.destroy({
        where: {
          role_uid: roles.uid,
        },
      });

      let function_uids = req.body.function_uids;
      for (let i = 0; i < function_uids.length; i++) {
        Role_Function.create({
          function_uid: function_uids[i],
          role_uid: roles.uid,
        });
      }
    }
    let user_uid = await User.findAll({
      where: {
        role_uid: roles.uid,
      },
    });
    if (user_uid) {
      for (let i = 0; i < user_uid.length; i++) {
        User.update(
          {
            role_uid: null,
          },
          {
            where: {
              uid: user_uid[i].uid,
            },
          }
        );
      }
    }
    let user_uids = req.body.user_uids;
    for (let i = 0; i < user_uids.length; i++) {
      let user = await User.findOne({
        where: {
          uid: user_uids[i],
        },
      });
      if (!user) {
        res
          .status(AppConstant.STATUS_NOT_FOUND)
          .json(responseFormat({ message: "User is not exist!" }));
      } else {
        User.update(
          {
            role_uid: roles.uid,
          },
          {
            where: {
              uid: user.uid,
            },
          }
        );
      }
    }
    let data = await Role.findAll({
      where: {
        uid: roles.uid,
      },
      include: [
        { model: Role_Function, include: [{ model: Function }] },
        { model: User, attributes: ["uid", "username"] },
      ],
    });
    res
      .status(AppConstant.STATUS_OK)
      .send({ message: "OK", success: true, data: data });
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
/**
 * view  all data  role
 * @param {*} req
 * @param {*} res
 */
export const ViewRole = async (req, res) => {
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

    let roles = await Role.findAndCountAll({
      ...pagination,
      where: {
        role: {
          [Op.like]: `%${req.query.role_filter}%`,
        },
      },
      include: [
        { model: Role_Function, include: [{ model: Function }] },
        { model: User, attributes: ["uid", "username"] },
      ],
    });
    if (roles) {
      res.status(AppConstant.STATUS_OK).json({
        success: true,
        message: "OK",
        total: roles.count,
        data: roles.rows,
      });
    } else {
      res
        .status(AppConstant.STATUS_NOT_FOUND)
        .json(responseFormat({ message: "Role is not exist!" }));
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
/**
 * get data role by uid
 * @param {*} req
 * @param {*} res
 */
export const ViewRoleByUid = async (req, res) => {
  try {
    let roles = await Role.findAll({
      where: {
        uid: req.params.role_uid,
      },
      include: [
        { model: Role_Function, include: [{ model: Function }] },
        { model: User, attributes: ["uid", "username"] },
      ],
    });
    if (roles) {
      res.status(AppConstant.STATUS_OK).json({
        success: true,
        message: "OK",
        data: roles,
      });
    } else {
      res
        .status(AppConstant.STATUS_NOT_FOUND)
        .json(responseFormat({ message: "Role is not exist!" }));
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
/**
 * delete data role by uid
 * @param {*} req
 * @param {*} res
 */
export const DeleteRole = async (req, res) => {
  try {
    await Role.destroy({
      where: {
        uid: req.params.role_uid,
      },
    });
    res.status(AppConstant.STATUS_OK).json(responseFormat());
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

export const RoleDetail = async (req,res) =>{
  try{
    let role = User.findOne({
      where:{
        uid : req.userUid
      },
      include:[{
        model: Role,
        attributes:["uid"],
        include:[{
          model: Role_Function,
          include: [{
            model: Function,
            attributes: ["uid","method"]
          }]
        }]
      }]
      
    })
    res.status(AppConstant.STATUS_OK).json(responseFormat({data: role}));
  }catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
}