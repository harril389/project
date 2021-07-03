import { database } from "../config";
import { AppConstant } from "../const";
import { responseFormat, convertPaging } from "../utils";
import { FormatExamUser } from "../format";
import bcrypt from "bcrypt";
import e from "express";
const User = database.Model.user;
const Exam = database.Model.exam;
const Answer = database.Model.answer;
const Question_Exam = database.Model.question_exam;
const Question = database.Model.question;
const User_Exam = database.Model.user_exam;
const Result = database.Model.result;
const Op = database.Sequelize.Op;

/**
 * Get List Exam User
 * @param {*} req
 * @param {*} res
 */
export const ExamList = async (req, res) => {
  try {
    let { size, page, paging } = convertPaging(req);
    // create paging
    let pagination =
      paging === 0
        ? {}
        : {
            limit: size,
            offset: (page - 1) * size,
          };
    // create query object
    let queryData = {};
    if (req.query?.name_exam_filter) {
      queryData.name = {
        [Op.like]: `%${req.query?.name_exam_filter}%`,
      };
    }

    queryData.status = {
      [Op.or]: [
        AppConstant.STATUS_EXAM.can_see_exam,
        AppConstant.STATUS_EXAM.can_take_exam,
      ],
    };

    let { count, rows: data } = await User_Exam.findAndCountAll({
      ...pagination,
      where: {
        user_uid: req.userUid,
      },
      include: [
        {
          model: Exam,
          where: {
            ...queryData,
          },
        },
      ],
      order: [[database.sequelize.literal("createdAt"), "desc"]],
      distinct: true,
    });

    let newFormData = data.map((userExam) =>
      FormatExamUser.formatFormResponseExam(userExam.exam)
    );

    let response =
      paging === 0
        ? {
            data: newFormData,
            total: count,
          }
        : {
            data: newFormData,
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
 * Check Password Exam and return List Question
 * @param {*} req
 * @param {*} res
 */
export const CheckPassword = async (req, res) => {
  try {
    let exam = await Exam.findOne({
      where: {
        uid: req.body.exam_uid,
        status: AppConstant.STATUS_EXAM.can_take_exam,
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
          where: {
            user_uid: req.userUid,
          },
        },
      ],
    });
    if (!exam) {
      res
        .status(AppConstant.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "Required role take exam!" }));
    } else {
      let currentTimestamp = Date.now() / 1000;
      let startTime = exam.dataValues.start_time;
      let endTime = exam.dataValues.end_time;
      let passwordIsValid = exam.dataValues.password
        ? bcrypt.compareSync(req.body.password, exam.dataValues.password)
        : true;

      if (startTime > currentTimestamp || endTime < currentTimestamp) {
        res
          .status(AppConstant.STATUS_BAD_REQUEST)
          .json(responseFormat({ message: "Not during the test time!" }));
      } else if (!passwordIsValid) {
        res
          .status(AppConstant.STATUS_BAD_REQUEST)
          .json(responseFormat({ message: "Password exam is invalid!" }));
      } else {
        res.status(AppConstant.STATUS_OK).json(
          responseFormat({
            data: FormatExamUser.formatFormQuestionTakeExam(exam),
          })
        );
      }
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

/**
 * Post Answer User After Taking of Exam
 * @param {*} req
 * @param {*} res
 */
export const AnswerUser = async (req, res) => {
  try {
    let examUid = req.params.exam_uid;
    let arrayAnswer = req.body.questions;
    let userUid = req.userUid;

    // query exam
    let exam = await Exam.findOne({
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
            {
              model: Answer,
            },
          ],
        },
      ],
    });
    // check resubmit form data answers
    let questionExamData = exam.dataValues.question_exams;
    let lengthAnswer = 0;
    questionExamData?.forEach((itemMap) => {
      if (itemMap?.answers?.length > 0) {
        lengthAnswer++;
      }
    });
    if (questionExamData?.length === lengthAnswer) {
      return res
        .status(AppConstant.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "Not resubmit form answers!" }));
    }
    // check data answer
    if (arrayAnswer?.length !== questionExamData?.length) {
      return res
        .status(AppConstant.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "Please submit all question!" }));
    }
    // check time submit
    let currentTime = Date.now() / 1000;
    if (currentTime > exam.dataValues.end_time + 300) {
      return res
        .status(AppConstant.STATUS_BAD_REQUEST)
        .json(responseFormat({ message: "Out of submit time!" }));
    }

    let arrayAnswerResult = [];
    let userExamData = {
      score: 0,
      total_question_correct: 0,
      total_question_incorrect: 0,
    };
    arrayAnswer.map(async (questionItem) => {
      let question_exam = await Question_Exam.findOne({
        where: {
          exam_uid: examUid,
          question_uid: questionItem?.question_uid,
        },
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
      });
      let answerArr = [];
      let status_result = true;
      question_exam.dataValues.question.results.map((item) => {
        let have_in_list = false;
        questionItem.answers.map((itemAnswer) => {
          if (item.uid === itemAnswer.uid) {
            have_in_list = true;
            if (!item.is_result && status_result) status_result = false;
            answerArr.push({
              uid: item.uid,
              content: item.content,
              is_tick: have_in_list,
            });
            return;
          }
        });
        if (!have_in_list) {
          answerArr.push({
            uid: item.uid,
            content: item.content,
            is_tick: have_in_list,
          });
        }
      });
      arrayAnswerResult.push({
        answer: JSON.stringify(answerArr),
        status: status_result,
        question_in_exam_uid: question_exam?.dataValues?.uid,
        user_uid: userUid,
      });
      userExamData = {
        score: status_result
          ? userExamData.score +
            parseInt(question_exam.dataValues.question.point)
          : userExamData.score,
        total_question_correct: status_result
          ? userExamData.total_question_correct + 1
          : userExamData.total_question_correct,
        total_question_incorrect: status_result
          ? userExamData.total_question_incorrect + 1
          : userExamData.total_question_incorrect,
      };
    });

    setTimeout(async () => {
      // save to database
      await Answer.bulkCreate(arrayAnswerResult);
      await User_Exam.update(
        {
          ...userExamData,
        },
        {
          where: {
            exam_uid: examUid,
            user_uid: userUid,
          },
        }
      );
      // response to client
      res.status(AppConstant.STATUS_OK).json(
        responseFormat({
          data: userExamData,
        })
      );
    }, 5000);
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};

/**
 * Get List History Taking Exam
 * @param {*} req
 * @param {*} res
 */
export const getListHistoryTakingExam = async (req, res) => {
  try {
    let { size, page, paging } = convertPaging(req);
    // create paging
    let pagination =
      paging === 0
        ? {}
        : {
            limit: size,
            offset: (page - 1) * size,
          };
    // create query object
    let queryData = {};
    queryData.end_time = {
      [Op.lte]: Date.now() / 1000,
    };
    if (req.query?.name_exam_filter) {
      queryData.name = {
        [Op.like]: `%${req.query?.name_exam_filter}%`,
      };
    }
    let { count, rows: data } = await User_Exam.findAndCountAll({
      ...pagination,
      where: {
        user_uid: req.userUid,
      },
      include: [
        {
          model: Exam,
          where: {
            ...queryData,
          },
        },
      ],
      order: [[database.sequelize.literal("createdAt"), "desc"]],
      distinct: true,
    });
    let newFormData = FormatExamUser.formatFormDataHistoryList(data);
    let response =
      paging === 0
        ? {
            data: newFormData,
            total: count,
          }
        : {
            data: newFormData,
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
 * Get History Taking Exam By Uid
 * @param {*} req
 * @param {*} res
 */
export const getHistoryExamByUid = async (req, res) => {
  try {
    let examUid = req.params.exam_uid;
    let userUid = req.userUid;
    let ExamDetails = await User_Exam.findOne({
      where: {
        user_uid: userUid,
        exam_uid: examUid,
      },
      include: [
        {
          model: Exam,
          where: {
            end_time: {
              [Op.lte]: Date.now() / 1000,
            },
          },
          include: [
            {
              model: Question_Exam,
              include: [
                {
                  model: Question,
                },
                {
                  model: Answer,
                },
              ],
            },
          ],
        },
      ],
    });
    if (ExamDetails) {
      res
        .status(AppConstant.STATUS_OK)
        .json(
          responseFormat({
            data: FormatExamUser.formatFormDataHistoryDetails(ExamDetails),
          })
        );
    } else {
      res
        .status(AppConstant.STATUS_NOT_FOUND)
        .json(responseFormat({ message: "Not find exam!" }));
    }
  } catch (error) {
    res
      .status(AppConstant.STATUS_SERVER_ERROR)
      .json(responseFormat({ error: error, message: "error" }));
  }
};
