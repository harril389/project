import { database } from "../config";
import { AppConstant } from "../const";
import { responseFormat, convertPaging } from "../utils";
import { FormatQuestion } from "../format";
const Question = database.Model.question;
const Result = database.Model.result;
const TypeQuestion = database.Model.type_question;
const QuestionExam = database.Model.question_exam;
const Op = database.Sequelize.Op;

/**
 * create question
 * @param {*} req
 * @param {*} res
 */
export const CreateQuestion = async (req, res) => {
  try {
    let formData = req.body;
    let isResultsValid =
      Array.isArray(formData?.results) && formData?.results.length > 0;
    if (!formData?.question_text) {
      return res
        .status(AppConstant.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "Required name question!" }));
    } else if (!isResultsValid) {
      return res
        .status(AppConstant.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "Required results question!" }));
    }
    if (!formData?.results) {
      return res
        .status(AppConstant.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "Required results!" }));
    }
    // Check question text is exist
    let question = await Question.findOne({
      where: {
        question_text: formData.question_text,
      },
    });

    // Check type question is exist with uid type question
    let typeQuestion = null;
    if (formData?.type_question_uid) {
      typeQuestion = await TypeQuestion.findOne({
        where: {
          uid: formData?.type_question_uid,
        },
      });
      if (!typeQuestion) {
        return res
          .status(AppConstant.STATUS_BAD_REQUEST)
          .json(responseFormat({ message: "Type question is not exist!" }));
      }
    }

    if (question) {
      return res
        .status(AppConstant.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "Question has exist!" }));
    } else {
      let countManyCorrect = 0;
      formData.results.map((dataMap) => {
        if (dataMap?.is_result) {
          countManyCorrect++;
        }
      });

      formData.is_many_correct = Boolean(
        countManyCorrect > 1 || formData.results?.length > 4
      );
      let newQuestion = await Question.create(
        FormatQuestion.formatDataQuestionRequest(formData)
      );

      let arrResults = [];
      if (isResultsValid) {
        let arrayResult = formData.results.map((data) => ({
          ...data,
          question_uid: newQuestion?.dataValues?.uid,
        }));
        arrResults = await Result.bulkCreate(arrayResult);
      }

      // Format response
      let data = FormatQuestion.formatDataQuestionResponse({
        ...newQuestion,
        results: arrResults.map((formatData) =>
          FormatQuestion.formatDataAnswerResponse(formatData)
        ),
        type_question:
          FormatQuestion.formatDataTypeQuestionResponse(typeQuestion),
      });

      res
        .status(AppConstant.STATUS_CREATED)
        .json(responseFormat({ data: data }));
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

/**
 * edit  question
 * @param {*} req
 * @param {*} res
 */
export const EditQuestion = async (req, res) => {
  try {
    let questionUid = req.params.question_uid;
    let formData = req.body;
    let isResultsInValid = !(
      Array.isArray(formData?.results) && formData?.results.length > 0
    );
    if (!formData?.question_text) {
      return res
        .status(AppConstant.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "Required name question!" }));
    } else if (isResultsInValid) {
      return res
        .status(AppConstant.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "Required results question!" }));
    }
    // Check question text is exist
    let question = await Question.findOne({
      where: {
        uid: {
          [Op.ne]: questionUid,
        },
        question_text: formData.question_text,
      },
    });

    let currentQuestion = await Question.findOne({
      where: {
        uid: questionUid,
      },
      include: [
        {
          model: TypeQuestion,
          attributes: ["uid"],
        },
        {
          model: Result,
          attributes: ["uid"],
        },
      ],
    });

    // Check type question is exist with uid type question
    let typeQuestion = null;
    if (formData?.type_question_uid) {
      typeQuestion = await TypeQuestion.findOne({
        where: {
          uid: formData?.type_question_uid,
        },
      });
      if (!typeQuestion) {
        return res
          .status(AppConstant.STATUS_BAD_REQUEST)
          .json(responseFormat({ message: "Type question is not exist!" }));
      }
    }
    if (question) {
      return res
        .status(AppConstant.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "Question has exist!" }));
    } else {
      for (let i = 0; i < currentQuestion?.results?.length; i++) {
        let dataMap = currentQuestion?.results[i];
        await Result.destroy({
          where: {
            uid: dataMap?.uid,
          },
        });
      }

      let countManyCorrect = 0;
      let formDataResult = formData?.results?.map((dataMap) => {
        if (dataMap?.is_result) {
          countManyCorrect++;
        }
        return {
          content: dataMap?.content,
          is_result: dataMap?.is_result,
          question_uid: questionUid,
        };
      });
      let arrResults = await Result.bulkCreate(formDataResult);

      await Question.update(
        FormatQuestion.formatDataQuestionRequest({
          ...formData,
          is_many_correct: Boolean(
            countManyCorrect > 1 || formData?.results?.length > 4
          ),
        }),
        {
          where: {
            uid: questionUid,
          },
        }
      );

      // Format response
      let data = {
        ...FormatQuestion.formatDataQuestionResponse({
          dataValues: {
            uid: questionUid,
            is_many_correct: Boolean(countManyCorrect > 1),
            ...formData,
          },
          results: arrResults.map((formatData) =>
            FormatQuestion.formatDataAnswerResponse(formatData)
          ),
        }),
        type_question:
          FormatQuestion.formatDataTypeQuestionResponse(typeQuestion),
      };

      res.status(AppConstant.STATUS_OK).json(responseFormat({ data: data }));
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

/**
 * view  all data  question with same typeQuestion
 * @param {*} req
 * @param {*} res
 */
export const ViewQuestion = async (req, res) => {
  try {
    let { size, page, paging } = convertPaging(req);

    let pagination =
      paging === 0
        ? {}
        : {
            limit: size,
            offset: (page - 1) * size,
          };

    let queryData = {};
    if (req.query?.filter) {
      queryData.question_text = {
        [Op.like]: `%${req.query?.filter}%`,
      };
    }
    if (req.query?.type_question_uid) {
      queryData.type_question_uid = req.query?.type_question_uid;
    }
    if (req.query?.point_start) {
      queryData.point = {
        [Op.gte]: req.query?.point_start,
      };
    }
    if (req.query?.point_end) {
      queryData.point = {
        [Op.lte]: req.query?.point_end,
      };
    }

    let { count, rows: data } = await Question.findAndCountAll({
      ...pagination,
      where: {
        ...queryData,
      },
      attributes: [
        "uid",
        "question_text",
        "point",
        "is_many_correct",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: Result,
          attributes: ["uid", "content", "is_result"],
        },
        {
          model: TypeQuestion,
          attributes: ["uid", "type", "description"],
        },
      ],
      order: [[database.sequelize.literal("createdAt"), "desc"]],
      distinct: true,
    });

    let response =
      paging === 0
        ? {
            data: data,
            total: count,
          }
        : {
            data: data,
            total: count,
            page: page,
          };

    res.status(AppConstant.STATUS_OK).json(responseFormat(response));
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

/**
 * get data  question by uid
 * @param {*} req
 * @param {*} res
 */
export const ViewQuestionByUid = async (req, res) => {
  try {
    let questionUid = req.params.question_uid;
    let questionDetails = await Question.findOne({
      where: {
        uid: questionUid,
      },
      attributes: ["uid", "question_text", "point", "is_many_correct"],
      include: [
        {
          model: Result,
          attributes: ["uid", "content", "is_result"],
        },
        {
          model: TypeQuestion,
          attributes: ["uid", "type", "description"],
        },
      ],
    });

    if (!questionDetails) {
      return res
        .status(AppConstant.STATUS_NOT_FOUND)
        .json(responseFormat({ message: "Question is not exist!" }));
    }

    res.status(AppConstant.STATUS_OK).json(
      responseFormat({
        data: questionDetails,
      })
    );
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
export const DeleteQuestion = async (req, res) => {
  try {
    let questionUid = req.params.question_uid;
    let currentQuestion = await Question.findOne({
      where: {
        uid: questionUid,
      },
      include: [
        {
          model: TypeQuestion,
          attributes: ["uid"],
        },
        {
          model: Result,
          attributes: ["uid"],
        },
        {
          model: QuestionExam,
          attributes: ["uid"],
        },
      ],
    });
    if (!currentQuestion) {
      return res
        .status(AppConstant.STATUS_NOT_FOUND)
        .json(responseFormat({ message: "Question is not exist!" }));
    }

    let mapDataQuestion = currentQuestion?.dataValues;

    for (let i = 0; i < mapDataQuestion?.question_exams?.length; i++) {
      let dataMap = mapDataQuestion?.question_exams[i];
      await QuestionExam.destroy({
        where: {
          uid: dataMap?.uid,
        },
      });
    }

    for (let i = 0; i < mapDataQuestion?.results?.length; i++) {
      let mapData = mapDataQuestion?.results[i];
      await Result.destroy({
        where: {
          uid: mapData?.uid,
        },
      });
    }

    await Question.destroy({
      where: {
        uid: questionUid,
      },
    });

    res.status(AppConstant.STATUS_OK).json(responseFormat());
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
