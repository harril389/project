import { AppConstant } from "../const";

export const formatFormResponseExam = (data, total_question) => ({
  uid: data?.dataValues?.uid,
  name: data?.dataValues?.name,
  start_time: data?.dataValues?.start_time,
  end_time: data?.dataValues?.end_time,
  time: data?.dataValues?.time,
  have_password: Boolean(data?.dataValues?.password),
  description: data?.dataValues?.description,
  total_question: total_question,
  status: checkStatusExam(data?.dataValues),
});

export const formatFormQuestionTakeExam = (data) => {
  let newFormData = {
    uid: data.dataValues.uid,
    name: data.dataValues.name,
    end_time: data.dataValues.end_time,
    time: data.dataValues.time,
  };
  newFormData.questions = data.dataValues.question_exams.map(
    (questionItem) => ({
      uid: questionItem.question.uid,
      question_text: questionItem.question.question_text,
      is_many_correct: questionItem.question.is_many_correct,
      results: questionItem.question.results.map((resultItem) => ({
        uid: resultItem.uid,
        content: resultItem.content,
      })),
    })
  );
  return newFormData;
};

const checkStatusExam = (data) => {
  let checkStatusCanTake = Boolean(
    data?.status === AppConstant.STATUS_EXAM.can_take_exam
  );
  let currentTimestamp = Date.now() / 1000;

  let checkTimeExam =
    data?.start_time <= currentTimestamp && currentTimestamp < data?.end_time;
  if (checkStatusCanTake && checkTimeExam) {
    return AppConstant.STATUS_EXAM.can_take_exam;
  }
  return AppConstant.STATUS_EXAM.can_see_exam;
};

export const formatFormDataHistoryList = (data) => {
  let newForm = data.map((item) => ({
    uid: item.dataValues.exam.uid,
    name: item.dataValues.exam.name,
    start_time: item.dataValues.exam.start_time,
    end_time: item.dataValues.exam.end_time,
    score: item.dataValues.score,
    total_question_correct: item.dataValues.total_question_correct,
    total_question_incorrect: item.dataValues.total_question_incorrect,
  }));
  return newForm;
};

export const formatFormDataHistoryDetails = (data) => {
  let resultForm = {
    uid: data.dataValues.exam.uid,
    name: data.dataValues.exam.name,
    score: data.dataValues.score,
    total_question_correct: data.dataValues.total_question_correct,
    total_question_incorrect: data.dataValues.total_question_incorrect,
  };
  resultForm.questions = data.dataValues.exam.question_exams.map((item) => ({
    uid: item.question.uid,
    question_text: item.question.question_text,
    is_many_correct: item.question.is_many_correct,
    status_result: item.answers[0].status,
    results: JSON.parse(item.answers[0].answer),
  }));
  return resultForm;
};
