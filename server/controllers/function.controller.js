import { database } from "../config";
import { AppConstant } from "../const";
import { responseFormat } from "../utils";
const Function = database.Model.function;
const Op = database.Sequelize.Op;
/**
 * create function
 * @param {*} req
 * @param {*} res
 */
export const CreateFunction = async (req, res) => {
  try {
    if (!req.body.description || !req.body.path || !req.body.method || !req.body.object || !req.body.name){
      return res
        .status(AppConstant.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "Required name function!" }));
    } else {
      let funcs = await Function.findOne({
        where: {
          name: req.body.name,
        },
      });
  
      if (!funcs) {
        const data = await Function.create({
          name: req.body.name,
          object: req.body.object,
          method: req.body.method,
          path: req.body.path,
          description: req.body.description,
        }) 
        res
          .status(AppConstant.STATUS_OK)
          .json(responseFormat({data: data}));
      } else {
        res
          .status(AppConstant.STATUS_BAD_REQUEST)
          .json(responseFormat({ message: "Function has exist!" }));
      }
    }
  
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
/**
 * edit function
 * @param {*} req
 * @param {*} res
 */
export const EditFunction = async (req, res) => {
  try {
    let func = await Function.findOne({
      where: {
        uid: req.params.function_uid,
      },
    });

    if (!func) {
      res
        .status(AppConstant.STATUS_NOT_FOUND)
        .json(responseFormat({ message: "Function is not exist!" }));
    } else {
      Function.update(
        {
          name: req.body.name,
          object: req.body.object,
          method: req.body.method,
          path: req.body.path,
          description: req.body.description,
        },
        {
          where: {
            uid: req.params.function_uid,
          },
        }
      );
      let data = await Function.findOne({
        where:{
          uid: req.params.function_uid,
        }
      }
      )
      res
        .status(AppConstant.STATUS_OK)
        .json(responseFormat({data: data}));
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
/**
 * view  all data  function
 * @param {*} req
 * @param {*} res
 */
export const ViewFunction = async (req, res) => {
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

    let funcs = await Function.findAndCountAll({
      ...pagination,
      where: {
        name: {
          [Op.like]: `%${req.query.function_filter}%`,
        },
      },
    });
    if (funcs) {
      res.status(AppConstant.STATUS_OK).json({
        success: true,
        message: "OK",
        total: funcs.count,
        data: funcs.rows,
      });
    } else {
      res
        .status(AppConstant.STATUS_NOT_FOUND)
        .json(responseFormat({ message: "Function is not exist!" }));
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
/**
 * delete data function by uid
 * @param {*} req
 * @param {*} res
 */
export const DeleteFunction = async (req, res) => {
  try {
    await Function.destroy({
      where: {
        uid: req.params.function_uid,
      },
    });
    res
      .status(AppConstant.STATUS_OK)
      .json(responseFormat());
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
