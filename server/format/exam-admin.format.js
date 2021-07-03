import bcrypt from "bcrypt";

export const formatFormRequest = (data) => ({
  name: data.name,
  start_time: data.start_time,
  end_time: data.end_time,
  time: data?.time || 0,
  password: data?.password ? bcrypt.hashSync(data.password, 8) : "",
  description: data?.description || "",
  status: data?.status || AppConstant.STATUS_EXAM.can_not_see_exam,
  role_view_uid: data?.role_view_uid,
  question_uids: Array.isArray(data?.question_uids) ? data.question_uids : [],
  user_uids: Array.isArray(data?.user_uids) ? data.user_uids : [],
});

export const formatFormResponseExam = (data, total_question) => ({
  uid: data?.dataValues?.uid,
  name: data?.dataValues?.name,
  start_time: data?.dataValues?.start_time,
  end_time: data?.dataValues?.end_time,
  time: data?.dataValues?.time,
  have_password: Boolean(data?.dataValues?.password),
  description: data?.dataValues?.description,
  total_question: total_question,
  status: data?.dataValues?.status,
});

export const formatFormResponseExamDetails = (data, total_question) => {
  let formData = {
    uid: data?.dataValues?.uid,
    name: data?.dataValues?.name,
    start_time: data?.dataValues?.start_time,
    end_time: data?.dataValues?.end_time,
    time: data?.dataValues?.time,
    password: data?.dataValues?.password,
    description: data?.dataValues?.description,
    total_question: total_question,
    status: data?.dataValues?.status,
    questions: data?.dataValues?.question_exams.map((dataMap) => ({
      uid: dataMap?.question?.uid,
      is_many_correct: dataMap?.question?.is_many_correct,
      question_text: dataMap?.question?.question_text,
      answers: dataMap?.question?.results?.map((resultMap) => ({
        uid: resultMap?.uid,
        content: resultMap?.content,
      })),
    })),
    users: data?.dataValues?.user_exams.map((dataMap) => ({
      uid: dataMap?.user.uid,
      username: dataMap?.user.username,
      status_user: dataMap?.status,
    })),
  };
  return formData;
};
