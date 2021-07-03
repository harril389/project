import { database } from "../config";
import { AppConstant } from "../const";
import { responseFormat, convertPaging } from "../utils";
import { FormatExamAdmin } from "../format";
const Exam = database.Model.exam;
const Question_Exam = database.Model.question_exam;
const Question = database.Model.question;
const User_Exam = database.Model.user_exam;
const User = database.Model.user;
const Result = database.Model.result;
const Op = database.Sequelize.Op;

/**
 * create exam
 * @param {*} req
 * @param {*} res
 */
export const CreateExam = async (req, res) => {
  try {
    let formData = req.body;
    let errorValidate = checkInputForm(formData);
    if (errorValidate.length > 0) {
      return res
        .status(AppConstant.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: errorValidate }));
    }
    let newFormDataRequest = FormatExamAdmin.formatFormRequest(formData);
    let exam = await Exam.findOne({
      where: {
        name: newFormDataRequest.name,
      },
    });

    if (exam) {
      return res
        .status(AppConstant.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "Exam has exist!" }));
    } else {
      let newExam = await Exam.create(newFormDataRequest);
      let examUid = newExam.dataValues.uid;

      if (newFormDataRequest.question_uids.length > 0) {
        let convertFormQuestionExam = newFormDataRequest.question_uids.map(
          (dataMap) => ({
            exam_uid: examUid,
            question_uid: dataMap.uid,
          })
        );
        await Question_Exam.bulkCreate(convertFormQuestionExam);
      }

      if (newFormDataRequest.user_uids.length > 0) {
        let convertFormUserExam = newFormDataRequest.user_uids.map(
          (dataMap) => ({
            exam_uid: examUid,
            user_uid: dataMap.uid,
          })
        );
        await User_Exam.bulkCreate(convertFormUserExam);
      }

      res.status(AppConstant.STATUS_CREATED).json(
        responseFormat({
          data: FormatExamAdmin.formatFormResponseExam(
            newExam,
            newFormDataRequest.question_uids.length
          ),
        })
      );
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
/**
 * edit exam
 * @param {*} req
 * @param {*} res
 */
export const EditExam = async (req, res) => {
  try {
    let formData = req.body;
    let examUid = req.params.exam_uid;

    let errorValidate = checkInputForm(formData);

    let exam = await Exam.findOne({
      where: {
        uid: {
          [Op.ne]: examUid,
        },
        name: formData.name,
      },
    });
    if (errorValidate.length > 0) {
      return res
        .status(AppConstant.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: errorValidate }));
    }
    let newFormDataRequest = FormatExamAdmin.formatFormRequest(formData);

    if (exam) {
      return res
        .status(AppConstant.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "Exam has exist!" }));
    } else {
      await Exam.update(newFormDataRequest, {
        where: {
          uid: examUid,
        },
      });

      // Update question
      let questionList = newFormDataRequest.question_uids;
      let formNewQuestion = [];
      for (let i = 0; i < questionList.length; i++) {
        if (
          questionList[i]?.status ===
          AppConstant.STATUS_UPDATE_QUESTION_EXAM.delete
        ) {
          await Question_Exam.destroy({
            where: {
              exam_uid: examUid,
              question_uid: questionList[i]?.uid,
            },
          });
        } else if (
          questionList[i]?.status ===
          AppConstant.STATUS_UPDATE_QUESTION_EXAM.new
        ) {
          formNewQuestion.push({
            exam_uid: examUid,
            question_uid: questionList[i]?.uid,
          });
        }
      }
      if (formNewQuestion.length > 0) {
        await Question_Exam.bulkCreate(formNewQuestion);
      }

      // Update User
      let userList = newFormDataRequest.user_uids;
      let formNewUser = [];
      for (let i = 0; i < userList.length; i++) {
        if (
          userList[i]?.status === AppConstant.STATUS_UPDATE_QUESTION_EXAM.delete
        ) {
          await User_Exam.destroy({
            where: {
              exam_uid: examUid,
              user_uid: userList[i]?.uid,
            },
          });
        } else if (
          userList[i]?.status === AppConstant.STATUS_UPDATE_QUESTION_EXAM.new
        ) {
          formNewUser.push({
            exam_uid: examUid,
            user_uid: userList[i]?.uid,
          });
        }
      }
      if (formNewUser.length > 0) {
        await User_Exam.bulkCreate(formNewUser);
      }

      let newExam = await Exam.findOne({
        where: {
          uid: examUid,
        },
        include: [
          {
            model: Question_Exam,
          },
        ],
      });

      res.status(AppConstant.STATUS_OK).json(
        responseFormat({
          data: FormatExamAdmin.formatFormResponseExam(
            newExam,
            newExam?.dataValues?.question_exams?.length || 0
          ),
        })
      );
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
/**
 * view  all data  exam
 * @param {*} req
 * @param {*} res
 */
export const ViewExam = async (req, res) => {
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
    if (req.query?.name_exam_filter) {
      queryData.name = {
        [Op.like]: `%${req.query?.name_exam_filter}%`,
      };
    }
    if (req.query?.role_view_uid) {
      queryData.role_view_uid = req.query?.role_view_uid;
    }
    if (req.query?.status) {
      queryData.status = req.query?.status;
    }

    let { count, rows: data } = await Exam.findAndCountAll({
      ...pagination,
      where: {
        ...queryData,
      },
      include: [
        {
          model: Question_Exam,
        },
      ],
      order: [[database.sequelize.literal("createdAt"), "desc"]],
      distinct: true,
    });

    let formatData = data.map((dataMap) =>
      FormatExamAdmin.formatFormResponseExam(
        dataMap,
        dataMap?.dataValues?.question_exams?.length
      )
    );

    let response =
      paging === 0
        ? {
            data: formatData,
            total: count,
          }
        : {
            data: formatData,
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
 * get data  exam by uid
 * @param {*} req
 * @param {*} res
 */
export const ViewExamByUid = async (req, res) => {
  try {
    let examUid = req.params.exam_uid;
    let examDetails = await Exam.findOne({
      where: {
        uid: examUid,
      },
      include: [
        {
          model: Question_Exam,
          include: [
            {
              model: Question,
              include: [
                {
                  model: Result,
                },
              ],
            },
          ],
        },
        {
          model: User_Exam,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
    });

    if (!examDetails) {
      return res
        .status(AppConstant.STATUS_NOT_FOUND)
        .json(responseFormat({ message: "Exam is not exist!" }));
    } else {
      res.status(AppConstant.STATUS_OK).json(
        responseFormat({
          data: FormatExamAdmin.formatFormResponseExamDetails(
            examDetails,
            examDetails?.dataValues?.question_exams?.length
          ),
        })
      );
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
/**
 * delete data exam by uid
 * @param {*} req
 * @param {*} res
 */
export const DeleteExam = async (req, res) => {
  try {
    let examUid = req.params.exam_uid;
    let currentExam = await Exam.findOne({
      where: {
        uid: examUid,
      },
      include: [
        {
          model: Question_Exam,
          attributes: ["uid"],
        },
      ],
    });
    if (!currentExam) {
      return res
        .status(AppConstant.STATUS_NOT_FOUND)
        .json(responseFormat({ message: "Exam is not exist!" }));
    }

    await Exam.destroy({
      where: {
        uid: examUid,
      },
    });
    currentExam?.question_exams?.forEach(
      async (data) =>
        await Question_Exam.destroy({
          where: {
            uid: data.uid,
          },
        })
    );
    res.status(AppConstant.STATUS_OK).json(responseFormat());
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

const checkInputForm = (data) => {
  let errorArray = [];
  if (!data?.name) {
    errorArray.push("Required name exam!");
  }

  if (!data?.start_time) {
    errorArray.push("Required name start time!");
  } else if (
    data.start_time >= AppConstant.CHECK_SIZE_INTEGER.max ||
    data.start_time <= AppConstant.CHECK_SIZE_INTEGER.min
  ) {
    errorArray.push("Start time has out size integer!");
  }

  if (!data?.end_time) {
    errorArray.push("Required name end time!");
  } else if (
    data.end_time >= AppConstant.CHECK_SIZE_INTEGER.max ||
    data.end_time <= AppConstant.CHECK_SIZE_INTEGER.min
  ) {
    errorArray.push("End time has out size integer!");
  }

  if (
    data.time >= AppConstant.CHECK_SIZE_INTEGER.max ||
    data.time <= AppConstant.CHECK_SIZE_INTEGER.min
  ) {
    errorArray.push("Time has out size integer!");
  }

  return errorArray;
};
