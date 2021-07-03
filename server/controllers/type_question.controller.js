import { database } from "../config";
import { AppConstant } from "../const";
import { responseFormat } from "../utils";
const TypeQuestion = database.Model.type_question;
const Op = database.Sequelize.Op;

/**
 * create type question
 * @param {*} req
 * @param {*} res
 */
export const CreateTypeQuestion = async (req, res) => {
  try {
    if (!req.body.description || !req.body.type) {
      return res
        .status(AppConstant.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "Required name type_question!" }));
    } else {
      let type_questions = await TypeQuestion.findOne({
        where: {
          type: req.body.type,
        },
      });
      if (!type_questions) {
        const data = await TypeQuestion.create({
          type: req.body.type,
          description: req.body.description,
        });
        res
          .status(AppConstant.STATUS_CREATED)
          .json(responseFormat({ data: data }));
      } else {
        res
          .status(AppConstant.STATUS_BAD_REQUEST)
          .json(responseFormat({ message: "Type question has exist!" }));
      }
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
/**
 * edit type question
 * @param {*} req
 * @param {*} res
 */
export const EditTypeQuestion = async (req, res) => {
  try {
    let type_questions = await TypeQuestion.findOne({
      where: {
        uid: req.params.type_question_uid,
      },
    });

    if (!type_questions) {
      res
        .status(AppConstant.STATUS_NOT_FOUND)
        .json(responseFormat({ message: "Result is not exist!" }));
    } else {
      await TypeQuestion.update(
        {
          type: req.body.type,
          description: req.body.description,
        },
        {
          where: {
            uid: req.params.type_question_uid,
          },
        }
      );
      let data = await TypeQuestion.findOne({
        where: {
          uid: req.params.type_question_uid,
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
/**
 * view  all data type question
 * @param {*} req
 * @param {*} res
 */
export const ViewTypeQuestion = async (req, res) => {
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
    if (req.query?.type_filter) {
      queryData.type = {
        [Op.like]: `%${req.query?.type_filter}%`,
      };
    }
    let type_questions = await TypeQuestion.findAndCountAll({
      ...pagination,
      where: {
        ...queryData,
      },
    });
    if (type_questions) {
      res.status(AppConstant.STATUS_OK).json({
        success: true,
        message: "OK",
        total: type_questions.count,
        data: type_questions.rows,
      });
    } else {
      res
        .status(AppConstant.STATUS_NOT_FOUND)
        .send({ success: false, message: "Type question not is exist!" });
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .send({ success: false, message: "Error -> " + error });
  }
};
/**
 * get data type question by uid
 * @param {*} req
 * @param {*} res
 */
export const ViewTypeQuestionByUid = async (req, res) => {
  try {
    let type_questions = await TypeQuestion.findOne({
      where: {
        uid: req.params.type_question_uid,
      },
    });
    if (type_questions) {
      res.status(AppConstant.STATUS_OK).json(
        responseFormat({
          data: type_questions,
        })
      );
    } else {
      res
        .status(AppConstant.STATUS_NOT_FOUND)
        .json(responseFormat({ message: "type question is not exist!" }));
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
/**
 * delete data type question by uid
 * @param {*} req
 * @param {*} res
 */
export const DeleteTypeQuestion = async (req, res) => {
  try {
    await TypeQuestion.destroy({
      where: {
        uid: req.params.type_question_uid,
      },
    });
    res.status(AppConstant.STATUS_OK).json(responseFormat());
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
